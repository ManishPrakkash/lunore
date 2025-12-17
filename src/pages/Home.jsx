import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import apiClient from '../services/apiClient';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/products/featured');
      setFeaturedProducts(response.data.products || []);
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden bg-noir-950">
      <HeroSection />
      <StorySection1 />
      <StorySection2 />
      <CategoryShowcase />
      <CraftsmanshipSection />
      <FeaturedCollection products={featuredProducts} loading={loading} />
      <LegacySection />
    </div>
  );
}

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y = useSpring(yRaw, springConfig);

  const opacityRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const opacity = useSpring(opacityRaw, springConfig);

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const scale = useSpring(scaleRaw, springConfig);

  return (
    <section ref={ref} className="relative h-[120vh] flex items-start justify-center pt-32 overflow-hidden">
      {/* Parallax Background with smooth spring */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-noir-950/60 via-noir-900/40 to-noir-950/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
          alt="Luxury fashion"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content with smooth fade */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center px-6 max-w-6xl will-change-opacity"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4">
            Since 2025
          </p>
          <h1 className="font-display text-7xl md:text-9xl text-ivory mb-4 tracking-tight leading-none">
            Lunoré
          </h1>
          <p className="text-2xl md:text-3xl text-pearl-300 mb-6 font-light max-w-3xl mx-auto leading-relaxed text-center">
            Where timeless elegance meets modern sophistication
          </p>
        </motion.div>
      </motion.div>


      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: useSpring(useTransform(scrollYProgress, [0, 0.3], [1, 0]), springConfig) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-pearl-400 text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-gold-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function StorySection1() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const x = useSpring(xRaw, springConfig);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-32 bg-ivory">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">
              Chapter I
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-noir-900 mb-8">
            A Legacy of
            <br />
            <span className="text-gold-600">Excellence</span>
          </h2>
          <p className="text-lg text-noir-700 leading-relaxed mb-6">
            For over a century, Lunoré has been synonymous with unparalleled
            craftsmanship and timeless design. Each piece tells a story of
            dedication, artistry, and the pursuit of perfection.
          </p>
          <p className="text-lg text-noir-700 leading-relaxed">
            From the ateliers of Milan to the fashion capitals of the world,
            our commitment to excellence remains unwavering.
          </p>
        </motion.div>

        {/* Image with smooth parallax */}
        <motion.div style={{ x }} className="relative will-change-transform">
          <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80"
              alt="Heritage"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 border-2 border-gold-500/30 rounded-lg -z-10" />
        </motion.div>
      </div>
    </section>
  );
}

function StorySection2() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const x = useSpring(xRaw, springConfig);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-32 bg-noir-900 text-ivory">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image with smooth parallax */}
        <motion.div style={{ x }} className="relative order-2 lg:order-1 will-change-transform">
          <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-8 -left-8 w-64 h-64 border-2 border-gold-500/30 rounded-lg -z-10" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="order-1 lg:order-2"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">
              Chapter II
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl mb-8">
            Artisanal
            <br />
            <span className="text-gold-500">Mastery</span>
          </h2>
          <p className="text-lg text-pearl-300 leading-relaxed mb-6">
            Every stitch, every seam, every detail is meticulously crafted by
            master artisans who have honed their skills over decades.
          </p>
          <p className="text-lg text-pearl-300 leading-relaxed">
            We believe that true luxury lies not in excess, but in the
            perfection of every element, no matter how small.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const categories = [
    {
      name: 'Shirts',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop&q=80',
      path: '/category/shirts',
      description: 'Timeless silhouettes',
      delay: 0,
    },
    {
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop&q=80',
      path: '/category/shoes',
      description: 'Handcrafted excellence',
      delay: 30,
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=800&h=1000&fit=crop&q=80',
      path: '/category/accessories',
      description: 'Refined details',
      delay: 60,
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-pearl-50">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-24 bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">
              Chapter III
            </span>
            <div className="h-px w-24 bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-noir-900 mb-6">
            The Collections
          </h2>
          <p className="text-xl text-noir-600 max-w-2xl mx-auto">
            Explore our curated selection of premium essentials
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const yRaw = useTransform(
              scrollYProgress,
              [0, 1],
              [category.delay, -category.delay]
            );
            const y = useSpring(yRaw, springConfig);

            return (
              <motion.div
                key={category.name}
                style={{ y }}
                className="will-change-transform"
              >
                <Link to={category.path} className="group block">
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6"
                  >
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir-900/80 via-noir-900/20 to-transparent" />

                    {/* Decorative corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold-500/50" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold-500/50" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold-500/50" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold-500/50" />

                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="font-display text-3xl text-ivory mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-pearl-300">{category.description}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CraftsmanshipSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const y = useSpring(yRaw, springConfig);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Smooth parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
          alt="Craftsmanship"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-noir-900/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-24 bg-gold-500" />
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">
            Our Philosophy
          </span>
          <div className="h-px w-24 bg-gold-500" />
        </div>
        <h2 className="font-display text-5xl md:text-7xl text-ivory mb-8 leading-tight">
          "Perfection is not attainable,
          <br />
          but if we chase perfection
          <br />
          we can catch{' '}
          <span className="text-gold-500">excellence</span>"
        </h2>
        <p className="text-xl text-pearl-300">— Lunoré Founder, 2025</p>
      </motion.div>
    </section>
  );
}

function FeaturedCollection({ products, loading }) {
  return (
    <section className="py-32 bg-ivory">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-24 bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">
              Chapter IV
            </span>
            <div className="h-px w-24 bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-noir-900 mb-6">
            This Season's Finest
          </h2>
          <p className="text-xl text-noir-600 max-w-2xl mx-auto">
            Handpicked pieces that embody our commitment to excellence
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-noir-600">Loading featured products...</p>
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12">
            <p className="text-noir-600">No featured products available</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            as={Link}
            to="/new"
            variant="secondary"
            size="lg"
            className="border-2 border-noir-900"
          >
            Explore Full Collection
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function LegacySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);
  const scale = useSpring(scaleRaw, springConfig);

  const opacityRaw = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.9]);
  const opacity = useSpring(opacityRaw, springConfig);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Smooth parallax background */}
      <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
          alt="Legacy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-900/50 to-noir-950/30" />
      </motion.div>

      {/* Decorative frame */}
      <div className="absolute inset-12 border-2 border-gold-500/20 pointer-events-none z-10" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center px-6 max-w-4xl will-change-opacity"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-6xl md:text-8xl text-ivory mb-8">
            Your Story
            <br />
            <span className="text-gold-500">Begins Here</span>
          </h2>
          <p className="text-2xl text-pearl-300 mb-12 leading-relaxed">
            Join a legacy of those who appreciate the finer things in life
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              as={Link}
              to="/new"
              variant="primary"
              size="lg"
              className="bg-gold-500 text-noir-900 hover:bg-gold-400"
            >
              Shop Now
            </Button>
            <Button
              as={Link}
              to="/about"
              variant="ghost"
              size="lg"
              className="text-ivory border-2 border-ivory hover:bg-ivory hover:text-noir-900"
            >
              Our Story
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
