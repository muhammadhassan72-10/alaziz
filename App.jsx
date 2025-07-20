import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  TrendingUp,
  Shield,
  Globe,
  ChevronRight,
  Play,
  Menu,
  X
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animatedText, setAnimatedText] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const heroTexts = [
    "Excellence in Education",
    "Shaping Future Leaders",
    "Where Dreams Take Flight",
    "Building Tomorrow's Innovators"
  ]

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Parent",
      content: "Crestwood Academy has transformed my child's learning experience. The teachers are dedicated and the facilities are world-class.",
      rating: 5
    },
    {
      name: "Dr. Muhammad Ali",
      role: "Education Consultant",
      content: "One of the finest educational institutions I've encountered. Their holistic approach to education is commendable.",
      rating: 5
    },
    {
      name: "Fatima Khan",
      role: "Alumni",
      content: "The foundation I received at Crestwood Academy prepared me for success in university and beyond.",
      rating: 5
    }
  ]

  const programs = [
    {
      title: "Primary Education",
      description: "Foundation years focusing on core subjects and character development",
      grades: "Grade 1-5",
      icon: BookOpen
    },
    {
      title: "Secondary Education",
      description: "Comprehensive curriculum preparing students for higher education",
      grades: "Grade 6-10",
      icon: GraduationCap
    },
    {
      title: "Higher Secondary",
      description: "Specialized tracks in Science, Commerce, and Arts",
      grades: "Grade 11-12",
      icon: Award
    }
  ]

  const achievements = [
    { number: "2500+", label: "Students" },
    { number: "150+", label: "Teachers" },
    { number: "25+", label: "Years of Excellence" },
    { number: "98%", label: "Success Rate" }
  ]

  const news = [
    {
      title: "Annual Science Fair 2024",
      date: "March 15, 2024",
      excerpt: "Students showcase innovative projects in our biggest science fair yet.",
      image: "/api/placeholder/300/200"
    },
    {
      title: "New Computer Lab Inauguration",
      date: "March 10, 2024",
      excerpt: "State-of-the-art computer lab with latest technology now open.",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Inter-School Sports Championship",
      date: "March 5, 2024",
      excerpt: "Our students bring home multiple medals from the regional championship.",
      image: "/api/placeholder/300/200"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let currentIndex = 0
    let currentText = ''
    let isDeleting = false
    let textIndex = 0

    const typeWriter = () => {
      const fullText = heroTexts[textIndex]
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentIndex - 1)
        currentIndex--
      } else {
        currentText = fullText.substring(0, currentIndex + 1)
        currentIndex++
      }

      setAnimatedText(currentText)

      let typeSpeed = isDeleting ? 50 : 100

      if (!isDeleting && currentIndex === fullText.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % heroTexts.length
        typeSpeed = 500
      }

      setTimeout(typeWriter, typeSpeed)
    }

    typeWriter()
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Crestwood Academy</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#programs" className="text-foreground hover:text-primary transition-colors">Programs</a>
              <a href="#news" className="text-foreground hover:text-primary transition-colors">News</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Student Portal</Button>
                <Button variant="outline" size="sm">Teacher Portal</Button>
                <Button variant="outline" size="sm">Parent Portal</Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
                <a href="#programs" className="text-foreground hover:text-primary transition-colors">Programs</a>
                <a href="#news" className="text-foreground hover:text-primary transition-colors">News</a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">Student Portal</Button>
                  <Button variant="outline" size="sm">Teacher Portal</Button>
                  <Button variant="outline" size="sm">Parent Portal</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm">
                  <Award className="h-4 w-4 mr-2" />
                  25+ Years of Educational Excellence
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                  Welcome to<br />
                  <span className="text-primary">{animatedText}</span>
                  <span className="animate-pulse">|</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Empowering students with quality education, modern facilities, and experienced faculty to shape the leaders of tomorrow.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Play className="h-5 w-5 mr-2" />
                  Take Virtual Tour
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Visit
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary">{achievement.number}</div>
                    <div className="text-sm text-muted-foreground">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="School Building" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">About Us</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Building Excellence Since 1999</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Crestwood Academy has been at the forefront of educational innovation, providing students with a comprehensive learning experience that prepares them for success in an ever-changing world.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide quality education that nurtures intellectual growth, character development, and prepares students for global citizenship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be a leading educational institution that empowers students to become innovative thinkers and responsible leaders.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Excellence, integrity, innovation, and inclusivity form the foundation of our educational philosophy and community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section id="programs" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Academic Programs</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Comprehensive Education</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our carefully designed curriculum ensures students receive a well-rounded education that prepares them for future challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <program.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <Badge variant="outline">{program.grades}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{program.description}</p>
                  <Button variant="outline" className="w-full">
                    Learn More <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">What Our Community Says</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <CardContent>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl font-medium mb-6 text-foreground">
                  "{testimonials[currentSlide].content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-lg">{testimonials[currentSlide].name}</div>
                  <div className="text-muted-foreground">{testimonials[currentSlide].role}</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section id="news" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Latest News</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">School Updates</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest happenings, events, and achievements at Crestwood Academy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">{item.date}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                  <Button variant="outline" size="sm">
                    Read More <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Contact Us</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about admissions or want to schedule a visit? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <MapPin className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      123 Education Street<br />
                      Karachi, Sindh 75300<br />
                      Pakistan
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <Phone className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      +92 21 1234 5678<br />
                      +92 300 1234567
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="p-6">
                <CardHeader className="pb-4">
                  <Mail className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    info@crestwoodacademy.edu.pk<br />
                    admissions@crestwoodacademy.edu.pk
                  </p>
                </CardContent>
              </Card>

              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.1!2d67.0!3d24.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ4JzAwLjAiTiA2N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location"
                ></iframe>
              </div>
            </div>

            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8" />
                <span className="text-2xl font-bold">Crestwood Academy</span>
              </div>
              <p className="text-primary-foreground/80">
                Empowering students with quality education and preparing them for a successful future.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#about" className="hover:text-primary-foreground transition-colors">About Us</a></li>
                <li><a href="#programs" className="hover:text-primary-foreground transition-colors">Academic Programs</a></li>
                <li><a href="#news" className="hover:text-primary-foreground transition-colors">News & Events</a></li>
                <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Portals</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="/student" className="hover:text-primary-foreground transition-colors">Student Portal</a></li>
                <li><a href="/teacher" className="hover:text-primary-foreground transition-colors">Teacher Portal</a></li>
                <li><a href="/parent" className="hover:text-primary-foreground transition-colors">Parent Portal</a></li>
                <li><a href="/principal" className="hover:text-primary-foreground transition-colors">Principal Portal</a></li>
                <li><a href="/admin" className="hover:text-primary-foreground transition-colors">Admin Portal</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Education Street, Karachi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+92 21 1234 5678</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@crestwoodacademy.edu.pk</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 Crestwood Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

