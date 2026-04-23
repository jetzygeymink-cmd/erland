/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Menu as MenuIcon, 
  Clock, 
  Banknote, 
  User, 
  School, 
  Trash2, 
  CheckCircle2, 
  Phone, 
  CheckSquare, 
  Square 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]);
  
  // State untuk Formulir
  const [formData, setFormData] = useState({
    nama: '',
    kelas: ''
  });

  const WHATSAPP_NUMBER = "6281217056536";
  const ADMIN_EMAIL = "tristanerland17@gmail.com";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: 'risol',
      name: "Risol Mayo Premium",
      price: 10000,
      displayPrice: "10.000 / 3 pcs",
      desc: "Kombinasi lezat isian sosis sapi, telur, dan balutan mayonnaise yang melimpah di dalam kulit krispi.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQwxbvZ4GWLP-N3KokkU7EjNWmIRvlIV1DGg-EAZjvz1dD910v1BwxUW0&s=10", 
      hasToppings: false
    },
    {
      id: 'pukis',
      name: "Pukis Manis",
      price: 10000,
      displayPrice: "10.000 / 10 pcs",
      desc: "Kue pukis lembut dengan pilihan topping lezat yang bisa dikombinasikan.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvr_u9KYNDOT38z7UemH79_9BabRFwU5MHZgBsLbYYw&s=10",
      hasToppings: true,
      toppings: ["Cokelat", "Keju", "Kacang"]
    }
  ];

  const toggleTopping = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter(t => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const addToCart = (product) => {
    const cartItem = {
      ...product,
      cartId: Date.now(),
      selectedToppings: product.hasToppings ? [...selectedToppings] : []
    };
    setCart([...cart, cartItem]);
    setSelectedToppings([]); // Reset topping setelah masuk keranjang
    setOrderComplete(false);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderDetails = cart.map(item => 
      `- ${item.name} ${item.selectedToppings?.length > 0 ? `(Topping: ${item.selectedToppings.join(', ')})` : ''}`
    ).join('\n');

    const whatsappBody = `*Detail Pesanan Rikis*
---------------------
*Nama Siswa:* ${formData.nama}
*Kelas:* ${formData.kelas}
---------------------
*Daftar Item:*
${orderDetails}
---------------------
*Total Pembayaran (COD):* Rp${totalPrice.toLocaleString('id-ID')}
    `;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappBody)}`;
    window.open(whatsappUrl, '_blank');
    setOrderComplete(true);
    setCart([]);
    setFormData({ nama: '', kelas: '' });
  };

  return (
    <div className="min-h-screen bg-[#FFF8E1] font-sans text-[#4A4A4A]">
      {/* Navigasi */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isCheckoutOpen ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-[#FF6B00] p-1.5 rounded-lg shadow-lg">
              <Banknote size={20} color="white" />
            </div>
            <span className={`text-2xl font-black tracking-tighter ${isScrolled || isCheckoutOpen ? 'text-[#FF6B00]' : 'text-white'}`}>RIKIS</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCheckoutOpen(!isCheckoutOpen)}
              className={`relative p-2 transition-colors ${isScrolled || isCheckoutOpen ? 'text-gray-700' : 'text-white'}`}
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full ring-2 ring-white"
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Bagian Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Latar Belakang Makanan" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#8D5524]/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-2 tracking-tighter drop-shadow-lg"
          >
            RIKIS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-medium opacity-90"
          >
            Risol Mayo & Pukis Manis Sekolah
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 inline-block bg-[#FFC107] text-[#8D5524] px-4 py-1 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg"
          >
            Sistem Bayar COD
          </motion.div>
        </div>
      </section>

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Daftar Produk */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-bold text-[#8D5524] flex items-center gap-3">
            <MenuIcon className="text-[#FF6B00]" /> Pilih Menu Favorit
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-orange-100 flex flex-col hover:border-orange-300 transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={product.image} className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" alt={product.name} />
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-4 py-1 rounded-full font-black text-[#FF6B00] shadow-md">
                    Rp{product.displayPrice}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{product.desc}</p>
                  
                  {product.hasToppings ? (
                    <div className="mt-auto">
                      <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Pilih Topping (Bisa {'>'} 1):</p>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {product.toppings.map(topping => (
                          <button 
                            key={topping}
                            onClick={() => toggleTopping(topping)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all border ${
                              selectedToppings.includes(topping) 
                                ? 'bg-[#FF6B00] text-white border-[#FF6B00]' 
                                : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-orange-200'
                            }`}
                          >
                            {selectedToppings.includes(topping) ? <CheckSquare size={16} /> : <Square size={16} />}
                            {topping}
                          </button>
                        ))}
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addToCart(product)}
                        className="w-full py-4 bg-[#FF6B00] text-white rounded-2xl font-bold hover:bg-[#E65A00] transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
                      >
                        Tambah Pesanan
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="mt-auto w-full py-4 bg-[#8D5524] text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} /> Masukkan Keranjang
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Panel Checkout */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[40px] p-8 shadow-2xl border border-orange-100 sticky top-24"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <CheckCircle2 className="text-[#FF6B00]" /> Keranjang Anda
            </h2>

            {orderComplete ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Pesanan Siap!</h3>
                <p className="text-gray-500 text-xs mt-2">Detail pesanan telah dikirim ke WhatsApp.</p>
                <button onClick={() => setOrderComplete(false)} className="mt-4 text-[#FF6B00] font-bold text-sm underline">Pesan Lagi</button>
              </motion.div>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {cart.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8 text-gray-300"
                      >
                        <ShoppingCart size={40} className="mx-auto mb-2 opacity-20" />
                        <p className="text-sm italic">Keranjang masih kosong...</p>
                      </motion.div>
                    ) : (
                      cart.map((item) => (
                        <motion.div 
                          key={item.cartId}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex justify-between items-start bg-orange-50/50 p-3 rounded-2xl border border-orange-100"
                        >
                          <div className="flex-grow">
                            <p className="font-bold text-sm text-[#8D5524]">{item.name}</p>
                            {item.selectedToppings?.length > 0 && (
                              <p className="text-[10px] text-[#FF6B00] font-bold">Topping: {item.selectedToppings.join(', ')}</p>
                            )}
                          </div>
                          <div className="text-right flex flex-col items-end gap-1">
                            <span className="text-xs font-black text-gray-700">Rp{item.price.toLocaleString('id-ID')}</span>
                            <button type="button" onClick={() => removeFromCart(item.cartId)} className="text-red-400 hover:text-red-600 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="Nama Siswa" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#FF6B00] outline-none text-sm"
                      value={formData.nama}
                      onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <School className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="Kelas (Contoh: XII-IPA)" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#FF6B00] outline-none text-sm"
                      value={formData.kelas}
                      onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-gray-400 text-sm uppercase">Total Harga</span>
                    <span className="text-2xl font-black text-[#FF6B00]">Rp{totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  
                  <motion.button 
                    whileHover={cart.length > 0 ? { scale: 1.02 } : {}}
                    whileTap={cart.length > 0 ? { scale: 0.98 } : {}}
                    disabled={cart.length === 0}
                    type="submit"
                    className={`w-full py-4 rounded-2xl font-black text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                      cart.length > 0 ? 'bg-[#FF6B00] text-white hover:bg-[#E65A00] shadow-orange-200' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Kirim via WhatsApp
                  </motion.button>
                  <p className="text-[9px] text-gray-400 text-center mt-4 uppercase tracking-tighter">
                    Pesanan masuk ke nomor: {WHATSAPP_NUMBER}
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      {/* Tombol Melayang WA */}
      <motion.a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        target="_blank" 
        rel="noreferrer" 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl z-50 flex items-center gap-2 group"
      >
        <Phone size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">Hubungi WA Kami</span>
      </motion.a>

      <footer className="bg-white py-10 px-6 border-t border-orange-100 mt-12 text-center">
        <p className="text-[#8D5524] font-black text-xl mb-2 tracking-tighter">RIKIS</p>
        <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">Pesan Sekarang - Bayar Di Tempat</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FF6B00;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default App;
