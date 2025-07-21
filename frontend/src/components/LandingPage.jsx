import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Instagram, MapPin, MessageCircle, Flame, Heart, Shield, Clock } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { nigerianStates } from '../data/mockData';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    state: ''
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nickname || !formData.email || !formData.state) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Mock submission
    toast({
      title: "Welcome to the Fire Club! 🔥",
      description: "You'll receive exclusive tips and offers soon."
    });
    
    // Reset form
    setFormData({ nickname: '', email: '', state: '' });
  };

  const openInstagramDM = () => {
    window.open('https://instagram.com/firecondomng', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Flame className="w-16 h-16 text-red-500 mr-4" />
            <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Fire Condom
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-6xl font-extrabold mb-6 text-white">
            Wet Days & Wild Nights
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 font-medium">
            Your pleasure shouldn't be boring. Get Fire Condoms for the experience you deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => scrollToSection('products')}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105"
            >
              Explore the Heat 🔥
            </Button>
            
            <Button 
              onClick={() => scrollToSection('signup')}
              variant="outline"
              size="lg"
              className="border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105"
            >
              Join the Fire Club 🔥
            </Button>
          </div>
        </div>
      </section>

      {/* Product Variants Section */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Ignite Your <span className="text-red-400">Passion</span>
          </h2>
          <p className="text-xl text-center text-gray-300 mb-16">
            Three variants designed for your ultimate experience
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Fire Xtra */}
            <Card className="bg-gradient-to-b from-blue-900/50 to-blue-800/30 border-blue-500/30 hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-16 h-16 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Fire Xtra</h3>
                <Badge className="bg-blue-600 text-white mb-4">Longer Lasting Pleasure</Badge>
                
                <ul className="text-left space-y-3 mb-8 text-gray-300">
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-blue-400" />Super-dotted texture</li>
                  <li className="flex items-center"><Heart className="w-4 h-4 mr-2 text-blue-400" />Flavored for enhanced taste</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 mr-2 text-blue-400" />Extra time lubricant</li>
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-blue-400" />3 condoms per pack</li>
                </ul>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Fire Xtacy */}
            <Card className="bg-gradient-to-b from-green-900/50 to-green-800/30 border-green-500/30 hover:border-green-400 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-16 h-16 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-green-300">Fire Xtacy</h3>
                <Badge className="bg-green-600 text-white mb-4">Greater Stimulation</Badge>
                
                <ul className="text-left space-y-3 mb-8 text-gray-300">
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-green-400" />Contoured design</li>
                  <li className="flex items-center"><Heart className="w-4 h-4 mr-2 text-green-400" />Flavored for pleasure</li>
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-green-400" />Ribbed & studded</li>
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-green-400" />3 condoms per pack</li>
                </ul>
                
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Fire Xotica */}
            <Card className="bg-gradient-to-b from-red-900/50 to-red-800/30 border-red-500/30 hover:border-red-400 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-red-600 rounded-lg flex items-center justify-center">
                  <Flame className="w-16 h-16 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-red-300">Fire Xotica</h3>
                <Badge className="bg-red-600 text-white mb-4">More Intensity</Badge>
                
                <ul className="text-left space-y-3 mb-8 text-gray-300">
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-red-400" />Contoured design</li>
                  <li className="flex items-center"><Heart className="w-4 h-4 mr-2 text-red-400" />Strawberry flavored</li>
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-red-400" />Ribbed texture</li>
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-red-400" />Super dotted</li>
                </ul>
                
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sign-up Section */}
      <section id="signup" className="py-20 px-4 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Exclusive Fire Tips & <span className="text-red-400">Offers</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands who've already ignited their passion
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Your nickname"
                value={formData.nickname}
                onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                className="w-full p-4 text-lg bg-black/50 border-red-500/50 focus:border-red-400 text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 text-lg bg-black/50 border-red-500/50 focus:border-red-400 text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                <SelectTrigger className="w-full p-4 text-lg bg-black/50 border-red-500/50 focus:border-red-400 text-white">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-red-500/50">
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state} className="text-white hover:bg-red-500/20">
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-6 text-xl font-bold transform transition-all duration-300 hover:scale-105"
            >
              I'm In 🔥
            </Button>
          </form>
        </div>
      </section>

      {/* Store Locator */}
      <section id="store-locator" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Where to Buy <span className="text-red-400">Fire</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Available nationwide at major pharmacies and convenience stores
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-black/50 border-red-500/30">
              <CardContent className="p-8">
                <MapPin className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Major Cities</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Lagos - All major pharmacies</li>
                  <li>• Abuja - Convenience stores</li>
                  <li>• Port Harcourt - Pharmacies</li>
                  <li>• Kano - Selected stores</li>
                  <li>• Ibadan - Major outlets</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-red-500/30">
              <CardContent className="p-8">
                <MessageCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Need Help Finding?</h3>
                <p className="text-gray-300 mb-6">
                  Can't find Fire Condoms in your area? Let us help you locate the nearest store.
                </p>
                <Button 
                  onClick={openInstagramDM}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Get Store Locations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social/Support Section */}
      <section id="support" className="py-20 px-4 bg-gradient-to-r from-black/80 to-red-900/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Got <span className="text-red-400">Questions?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            We're here to help with any questions about Fire Condoms
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={openInstagramDM}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-6 h-6 mr-2" />
              DM Us on Instagram
            </Button>
          </div>
          
          <p className="text-sm text-gray-400 mt-8">
            @firecondomng • Available 24/7 for your questions
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/80 border-t border-red-500/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Flame className="w-8 h-8 text-red-500 mr-2" />
            <span className="text-2xl font-bold text-white">Fire Condom</span>
          </div>
          
          <p className="text-gray-400 mb-4">
            Ignite Your Passion • Available Nationwide
          </p>
          
          <div className="flex justify-center space-x-6 text-gray-400 text-sm">
            <span>Safe • Tested • Certified</span>
            <span>•</span>
            <span>Made for Nigerian Adults</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;