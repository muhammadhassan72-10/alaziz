from flask import Blueprint, request, jsonify, session
from functools import wraps
from src.models.school import db, User, UserRole, Student, Teacher, Parent
from datetime import datetime, date

auth_bp = Blueprint('auth', __name__)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated_function

def role_required(roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user_id' not in session:
                return jsonify({'error': 'Authentication required'}), 401
            
            user = User.query.get(session['user_id'])
            if not user or user.role not in roles:
                return jsonify({'error': 'Insufficient permissions'}), 403
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'role']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        # Validate role
        try:
            role = UserRole(data['role'])
        except ValueError:
            return jsonify({'error': 'Invalid role'}), 400
        
        # Create user
        user = User(
            email=data['email'],
            role=role
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.flush()  # Get user ID
        
        # Create profile based on role
        if role == UserRole.STUDENT:
            profile_data = data.get('profile', {})
            student = Student(
                user_id=user.id,
                student_id=profile_data.get('student_id', f'STU{user.id:06d}'),
                first_name=profile_data.get('first_name', ''),
                last_name=profile_data.get('last_name', ''),
                date_of_birth=datetime.strptime(profile_data.get('date_of_birth'), '%Y-%m-%d').date() if profile_data.get('date_of_birth') else date.today(),
                gender=profile_data.get('gender', ''),
                phone=profile_data.get('phone', ''),
                address=profile_data.get('address', ''),
                admission_date=datetime.strptime(profile_data.get('admission_date'), '%Y-%m-%d').date() if profile_data.get('admission_date') else date.today(),
                class_id=profile_data.get('class_id', 1)  # Default to class 1
            )
            db.session.add(student)
            
        elif role == UserRole.TEACHER:
            profile_data = data.get('profile', {})
            teacher = Teacher(
                user_id=user.id,
                employee_id=profile_data.get('employee_id', f'TEA{user.id:06d}'),
                first_name=profile_data.get('first_name', ''),
                last_name=profile_data.get('last_name', ''),
                phone=profile_data.get('phone', ''),
                address=profile_data.get('address', ''),
                date_of_birth=datetime.strptime(profile_data.get('date_of_birth'), '%Y-%m-%d').date() if profile_data.get('date_of_birth') else None,
                hire_date=datetime.strptime(profile_data.get('hire_date'), '%Y-%m-%d').date() if profile_data.get('hire_date') else date.today(),
                qualification=profile_data.get('qualification', '')
            )
            db.session.add(teacher)
            
        elif role == UserRole.PARENT:
            profile_data = data.get('profile', {})
            parent = Parent(
                user_id=user.id,
                first_name=profile_data.get('first_name', ''),
                last_name=profile_data.get('last_name', ''),
                phone=profile_data.get('phone', ''),
                address=profile_data.get('address', ''),
                occupation=profile_data.get('occupation', '')
            )
            db.session.add(parent)
        
        db.session.commit()
        
        return jsonify({
            'message': 'User registered successfully',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        if not user.is_active:
            return jsonify({'error': 'Account is deactivated'}), 401
        
        # Create session
        session['user_id'] = user.id
        session['user_role'] = user.role.value
        
        # Get profile data based on role
        profile_data = None
        if user.role == UserRole.STUDENT and user.student_profile:
            profile_data = user.student_profile.to_dict()
        elif user.role == UserRole.TEACHER and user.teacher_profile:
            profile_data = user.teacher_profile.to_dict()
        elif user.role == UserRole.PARENT and user.parent_profile:
            profile_data = user.parent_profile.to_dict()
        
        return jsonify({
            'message': 'Login successful',
            'user': user.to_dict(),
            'profile': profile_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200

@auth_bp.route('/me', methods=['GET'])
@login_required
def get_current_user():
    try:
        user = User.query.get(session['user_id'])
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get profile data based on role
        profile_data = None
        if user.role == UserRole.STUDENT and user.student_profile:
            profile_data = user.student_profile.to_dict()
        elif user.role == UserRole.TEACHER and user.teacher_profile:
            profile_data = user.teacher_profile.to_dict()
        elif user.role == UserRole.PARENT and user.parent_profile:
            profile_data = user.parent_profile.to_dict()
        
        return jsonify({
            'user': user.to_dict(),
            'profile': profile_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/change-password', methods=['POST'])
@login_required
def change_password():
    try:
        data = request.get_json()
        
        if not data.get('current_password') or not data.get('new_password'):
            return jsonify({'error': 'Current password and new password are required'}), 400
        
        user = User.query.get(session['user_id'])
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        if not user.check_password(data['current_password']):
            return jsonify({'error': 'Current password is incorrect'}), 400
        
        user.set_password(data['new_password'])
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({'message': 'Password changed successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/users', methods=['GET'])
@role_required([UserRole.ADMIN, UserRole.PRINCIPAL])
def get_all_users():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        role_filter = request.args.get('role')
        
        query = User.query
        
        if role_filter:
            try:
                role = UserRole(role_filter)
                query = query.filter_by(role=role)
            except ValueError:
                return jsonify({'error': 'Invalid role filter'}), 400
        
        users = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'users': [user.to_dict() for user in users.items],
            'total': users.total,
            'pages': users.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/users/<int:user_id>', methods=['PUT'])
@role_required([UserRole.ADMIN])
def update_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        
        if 'email' in data:
            # Check if email is already taken by another user
            existing_user = User.query.filter_by(email=data['email']).first()
            if existing_user and existing_user.id != user_id:
                return jsonify({'error': 'Email already taken'}), 400
            user.email = data['email']
        
        if 'is_active' in data:
            user.is_active = data['is_active']
        
        if 'role' in data:
            try:
                user.role = UserRole(data['role'])
            except ValueError:
                return jsonify({'error': 'Invalid role'}), 400
        
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'User updated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/users/<int:user_id>', methods=['DELETE'])
@role_required([UserRole.ADMIN])
def delete_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        
        # Don't allow deleting the current user
        if user_id == session['user_id']:
            return jsonify({'error': 'Cannot delete your own account'}), 400
        
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({'message': 'User deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

