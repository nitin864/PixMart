

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const Welcome = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springConfig = { stiffness: 150, damping: 15 };
  const mouseX = useSpring(mousePosition.x, springConfig);
  const mouseY = useSpring(mousePosition.y, springConfig);

  const categories = [
    { name: 'Vegetables & Fruits', image: '🥬', gradient: 'from-emerald-400 to-green-600', time: '8 mins', discount: '50% OFF' },
    { name: 'Atta, Rice & Dal', image: '🌾', gradient: 'from-amber-400 to-orange-600', time: '10 mins', discount: '30% OFF' },
    { name: 'Snacks & Munchies', image: '🍿', gradient: 'from-purple-400 to-pink-600', time: '8 mins', discount: '40% OFF' },
    { name: 'Dairy & Breakfast', image: '🥛', gradient: 'from-blue-400 to-cyan-600', time: '10 mins', discount: '25% OFF' },
    { name: 'Instant & Frozen', image: '🍕', gradient: 'from-red-400 to-rose-600', time: '12 mins', discount: '35% OFF' },
    { name: 'Beauty & Hygiene', image: '💄', gradient: 'from-pink-400 to-fuchsia-600', time: '15 mins', discount: '20% OFF' },
    { name: 'Home & Kitchen', image: '🏠', gradient: 'from-teal-400 to-emerald-600', time: '15 mins', discount: '45% OFF' },
    { name: 'Baby Care', image: '👶', gradient: 'from-yellow-400 to-amber-600', time: '10 mins', discount: '30% OFF' },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast Delivery',
      desc: 'Get your groceries delivered in 10 minutes or less. We value your time.',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: '💰',
      title: 'Best Prices Guaranteed',
      desc: 'Competitive pricing with exclusive deals and offers every day.',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: '🌟',
      title: 'Premium Quality',
      desc: 'Hand-picked fresh products. Quality you can trust, delivered with care.',
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      icon: '🎁',
      title: 'Amazing Rewards',
      desc: 'Earn points on every order. More you shop, more you save.',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      desc: 'Multiple payment options with bank-grade security for peace of mind.',
      gradient: 'from-red-400 to-rose-500',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      desc: 'Our customer support team is always here to help you anytime.',
      gradient: 'from-cyan-400 to-blue-500',
    },
  ];

  const testimonials = [
    { name: 'Priya Sharma', text: 'Best grocery app! Super fast delivery and fresh products always.', rating: 5, avatar: '👩' },
    { name: 'Raj Patel', text: 'Amazing service. Got my order in 8 minutes. Highly recommend!', rating: 5, avatar: '👨' },
    { name: 'Anita Desai', text: 'Great prices and quality. My go-to app for all groceries now.', rating: 5, avatar: '👩‍🦰' },
  ];

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-600/30 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-40 -left-20 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-orange-600/30 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <div className="text-4xl opacity-20">
                {['🥬', '🍎', '🥛', '🍕', '🛒'][Math.floor(Math.random() * 5)]}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Premium Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">⭐</span>
                <span className="font-semibold text-gray-900">India's Fastest Delivery</span>
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Logo */}
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/50"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">🛒</span>
                </motion.div>
                <h1 className="text-4xl font-black text-gray-900">
                  Pix<span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Mart</span>
                </h1>
              </motion.div>

              <motion.h2
                className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Groceries in
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text text-transparent">
                    10 Minutes
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-2 lg:h-3 bg-gradient-to-r from-emerald-400 to-green-400 opacity-30 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </span>
              </motion.h2>

              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-10 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Fresh groceries & daily essentials delivered to your doorstep.
                <span className="text-emerald-600 font-bold"> Unbeatable prices. Lightning fast.</span>
              </motion.p>

              {/* CTA Buttons - Enhanced */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="group relative bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg shadow-2xl shadow-emerald-500/50 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2, shadow: '0 25px 50px -12px rgba(16, 185, 129, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Order Now
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  className="group bg-white text-gray-900 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg border-2 border-gray-200 hover:border-emerald-600 transition-all shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>Download App</span>
                    <span className="group-hover:rotate-12 transition-transform">📱</span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                className="grid grid-cols-3 gap-3 md:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { value: '10 min', label: 'Delivery', icon: '⚡' },
                  { value: '10k+', label: 'Products', icon: '🛍️' },
                  { value: '1M+', label: 'Users', icon: '❤️' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ y: -5, scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl mb-1 md:mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-600 font-semibold">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Enhanced Phone Mockup */}
            <motion.div
              className="relative lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ x: mouseX, y: mouseY }}
            >
              <div className="relative">
                {/* Enhanced Floating Cards */}
                <motion.div
                  className="absolute -left-8 lg:-left-12 top-1/4 bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-100 z-10"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="text-3xl lg:text-5xl">⚡</div>
                    <div>
                      <div className="text-xs lg:text-sm font-bold text-gray-900">Fast Delivery</div>
                      <div className="text-[10px] lg:text-xs text-gray-600 hidden lg:block">10 Min</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-8 lg:-right-12 top-1/3 bg-gradient-to-br from-emerald-500 to-green-600 text-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-2xl z-10"
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [2, -2, 2]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="text-3xl lg:text-5xl">💰</div>
                    <div>
                      <div className="text-xs lg:text-sm font-bold">Best Prices</div>
                      <div className="text-[10px] lg:text-xs opacity-90 hidden lg:block">50% OFF</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -left-6 lg:-left-8 bottom-1/4 bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-100 z-10"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [-3, 3, -3]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="text-3xl lg:text-5xl">🌟</div>
                    <div>
                      <div className="text-xs lg:text-sm font-bold text-gray-900">Top Quality</div>
                      <div className="text-[10px] lg:text-xs text-gray-600 hidden lg:block">4.8★</div>
                    </div>
                  </div>
                </motion.div>

                {/* Premium Phone Mockup */}
                <motion.div
                  className="relative mx-auto w-[280px] sm:w-[320px] lg:w-[340px] h-[560px] sm:h-[640px] lg:h-[680px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Phone Frame with Glow */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] lg:rounded-[3.5rem] p-2 lg:p-3 shadow-2xl">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-[2.5rem] lg:rounded-[3.5rem] blur-2xl" />
                    
                    {/* Screen */}
                    <div className="relative w-full h-full bg-white rounded-[2.25rem] lg:rounded-[3rem] overflow-hidden shadow-inner">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-4 lg:px-6 pt-3 lg:pt-4 pb-2">
                        <span className="text-[10px] lg:text-xs font-semibold">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-3 h-2 lg:w-4 lg:h-3 bg-gray-800 rounded-sm" />
                          <div className="w-3 h-2 lg:w-4 lg:h-3 bg-gray-800 rounded-sm" />
                          <div className="w-3 h-2 lg:w-4 lg:h-3 bg-gray-800 rounded-sm" />
                        </div>
                      </div>

                      {/* App Header */}
                      <motion.div 
                        className="p-4 lg:p-6 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 text-white relative overflow-hidden"
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 1 }}
                      >
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-24 lg:w-32 h-24 lg:h-32 bg-white/10 rounded-full -mr-12 lg:-mr-16 -mt-12 lg:-mt-16" />
                        <div className="absolute bottom-0 left-0 w-20 lg:w-24 h-20 lg:h-24 bg-white/10 rounded-full -ml-10 lg:-ml-12 -mb-10 lg:-mb-12" />
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-center mb-3 lg:mb-5">
                            <div>
                              <div className="text-[10px] lg:text-xs opacity-90 mb-1 flex items-center gap-1">
                                📍 Deliver to
                              </div>
                              <div className="font-bold text-base lg:text-lg flex items-center gap-2">
                                Home
                                <span className="text-xs">▼</span>
                              </div>
                            </div>
                            <motion.div 
                              className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-xl lg:rounded-2xl flex items-center justify-center"
                              whileHover={{ scale: 1.1, rotate: 90 }}
                            >
                              <span className="text-lg lg:text-xl">👤</span>
                            </motion.div>
                          </div>
                          
                          {/* Search Bar */}
                          <motion.div 
                            className="bg-white/20 backdrop-blur-md rounded-xl lg:rounded-2xl p-3 lg:p-4 text-xs lg:text-sm flex items-center gap-2 lg:gap-3"
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="text-lg lg:text-xl">🔍</span>
                            <span className="text-white/90">Search for products...</span>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Categories Scroll */}
                      <div className="px-3 lg:px-4 py-3 lg:py-5 flex gap-2 lg:gap-3 overflow-x-auto no-scrollbar">
                        {['🥬 Fresh', '🥛 Dairy', '🍕 Snacks', '🏠 Home'].map((cat, i) => (
                          <motion.div
                            key={i}
                            className="flex-shrink-0 px-3 lg:px-5 py-2 lg:py-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg lg:rounded-xl font-semibold text-xs lg:text-sm text-gray-800 whitespace-nowrap"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + i * 0.1 }}
                          >
                            {cat}
                          </motion.div>
                        ))}
                      </div>

                      {/* Product Cards */}
                      <div className="px-3 lg:px-4 space-y-2 lg:space-y-3">
                        {[
                          { name: 'Fresh Vegetables', price: '₹99', img: '🥬', discount: '20% OFF' },
                          { name: 'Organic Milk', price: '₹65', img: '🥛', discount: '15% OFF' },
                          { name: 'Premium Snacks', price: '₹149', img: '🍿', discount: '30% OFF' },
                        ].map((product, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3 lg:gap-4 bg-white border border-gray-100 p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 + i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-14 h-14 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl lg:rounded-2xl flex items-center justify-center text-3xl lg:text-4xl flex-shrink-0">
                              {product.img}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-gray-900 mb-1 text-xs lg:text-sm truncate">{product.name}</div>
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-600 font-bold text-sm lg:text-base">{product.price}</span>
                                <span className="text-[10px] lg:text-xs bg-green-100 text-green-700 px-2 py-0.5 lg:py-1 rounded-full font-semibold">
                                  {product.discount}
                                </span>
                              </div>
                            </div>
                            <motion.button
                              className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-600 text-white rounded-lg lg:rounded-xl font-bold text-base lg:text-lg flex items-center justify-center flex-shrink-0"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              +
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 lg:w-32 h-6 lg:h-7 bg-gray-900 rounded-b-2xl lg:rounded-b-3xl z-20" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          style={{ opacity }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs font-semibold tracking-wider uppercase">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 bg-gray-500 rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-100 rounded-full filter blur-3xl opacity-30" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-6 py-2 rounded-full text-sm font-bold tracking-wide">
                🛍️ SHOP BY CATEGORY
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Everything You Need,
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                One Click Away
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our wide range of categories and get them delivered in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="group relative cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {category.discount}
                  </div>

                  <div className="relative z-10">
                    <motion.div 
                      className="text-7xl mb-4 inline-block"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {category.image}
                    </motion.div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                        <span>⚡</span>
                        <span>{category.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Categories
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-emerald-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="bg-white text-emerald-700 px-6 py-2 rounded-full text-sm font-bold tracking-wide shadow-lg">
                ✨ WHY CHOOSE US
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Experience The
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                PixMart Difference
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just a grocery app, we're your everyday companion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 overflow-hidden">
                  {/* Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  {/* Icon with animated background */}
                  <div className="relative z-10 mb-6">
                    <motion.div
                      className={`inline-flex w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl items-center justify-center text-4xl shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">
                    {feature.desc}
                  </p>

                  {/* Arrow Icon */}
                  <motion.div
                    className="absolute bottom-8 right-8 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Loved by <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">1M+ Users</span>
            </h2>
            <p className="text-xl text-gray-600">See what our customers are saying</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">Verified User</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-7xl">🎉</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Ready to Experience
              <br />
              Lightning-Fast Delivery?
            </h2>
            <p className="text-2xl text-white/95 mb-10 leading-relaxed">
              Join over 1 million happy customers who trust PixMart for their daily needs
            </p>

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12">
              <motion.button
                className="group bg-white text-emerald-600 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl md:text-3xl">📱</span>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Download on</div>
                  <div className="text-base md:text-lg font-black">App Store</div>
                </div>
              </motion.button>

              <motion.button
                className="group bg-white text-emerald-600 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl md:text-3xl">🤖</span>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Get it on</div>
                  <div className="text-base md:text-lg font-black">Google Play</div>
                </div>
              </motion.button>
            </div>

            {/* Special Offer Badge */}
            <motion.div
              className="inline-flex items-center gap-3 bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl font-bold shadow-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">🎁</span>
              <span>Get 50% OFF on your first order!</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="text-2xl font-bold">PixMart</h3>
              </div>
              <p className="text-gray-400">Your everyday needs, delivered in minutes.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {['📘', '📸', '🐦', '📱'].map((icon, i) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-xl">{icon}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 PixMart. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for scrollbar and animations */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Welcome;