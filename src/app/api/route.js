export async function GET() {

  const data1 = [
    { page: 1,
      id: 1, 
      title: "iPhone 15 Pro Max", 
      description: "The iPhone 15 Pro Max is a premium smartphone featuring a sleek, dark gray finish and a distinctive triple-camera system on the back. Its design is both modern and luxurious, with a focus on advanced photography and video capabilities. It's built for users who demand top-tier performance and a sophisticated aesthetic.",
      image: "/Product/Phones/00.avif", 
      width:150, 
      height: 200,
      sale: true, 
      was: "5499.99",
      price: 4699.99,
      date: "tomorrow",
      features: [
        "Titanium frame for superior durability",
        "A17 Pro chip with enhanced performance",
        "48MP triple camera system with 5x optical zoom",
        "USB-C fast charging and all-day battery life",
      ],
      cart: "cart",
    },

    { page: 2,
      id: 2, 
      title: "Folding Smartphone", 
      description: "This is a revolutionary smartphone with a unique folding display. It can transform from a standard-sized phone into a larger tablet, offering greater screen real estate for productivity and entertainment. The innovative hinge mechanism and sleek design make it a versatile and futuristic device.",
      image: "/Product/Phones/01.jpg",
      width: 175, 
      height: 175, 
      margin: 25,
      price: 5249.99,
      date: "after 2 days",
      features: [
        "Flexible AMOLED foldable display",
        "Seamless multitasking in tablet mode",
        "High-precision hinge with 200,000 folds tested",
        "Dual battery system for extended use"
      ],
      cart: "cart"
    },

    { page: 3,
      id: 3, 
      title: "Gradient Mobile Phone", 
      description: "A stylish smartphone featuring a beautiful, light blue to light purple gradient finish on the back. It has a modern design with a small front-facing camera cutout and a vertical camera array on the rear. This phone combines eye-catching aesthetics with practical functionality.",
      image: "/Product/Phones/02.jpg",
      width: 200, 
      height: 200,
      sale: true, 
      was: "1699.99",
      price: 1499.99,
      date: "after 1 week",
      features: [
        "Gradient glass back design with vivid colors",
        "AI-powered dual rear cameras",
        "6.5-inch FHD+ edge-to-edge display",
        "Fast 30W charging and efficient processor"
      ]
    },

    { page: 4,
      id: 4, 
      title: "iPhone 10 (Black and White)", 
      description: "A classic and elegant smartphone design, shown in both black and white finishes. It features a dual-camera setup on the back and a shiny, minimalist build. This model is known for its timeless design and reliable performance.",
      image: "/Product/Phones/03.jpg",
      width: 150, 
      height: 200,
      sale: true, 
      was: "1199.99",
      price: 999.99,
      date: "after 4 days",
      features: [
        "Dual 12MP rear cameras with Portrait Mode",
        "5.8-inch Super Retina OLED display",
        "Face ID for secure authentication",
        "A11 Bionic chip with excellent performance"
      ]
    },

    { page: 5,
      id: 5, 
      title: "Modern Smartphone", 
      description: "This is a sleek and minimalist smartphone with a clean, all-black design. It features a small, centered camera cutout on the front and a simple, unadorned body. It is a perfect choice for users who appreciate simplicity and a clean aesthetic.",
      image: "/Product/Phones/04.jpg",
      width: 200, 
      height: 200, 
      price: 999.99,
      date: "after 6 days",
      features: [
        "Matte black aluminum body",
        "High-resolution front and rear cameras",
        "120Hz refresh rate display",
        "Long-lasting 4500mAh battery"
      ]
    },

    { page: 6,
      id: 6, 
      title: "Smartphone with 4 Lenses", 
      description: "A highly capable smartphone with a unique quad-camera system on the back, offering a variety of photographic options. The device has a matte gray finish and a clean, contemporary look. It is designed for photography enthusiasts who want a versatile tool for capturing high-quality images.",
      image: "/Product/Phones/05.jpg",
      width: 200, 
      height: 200,
      sale: true, 
      was: "1299.99",
      price: 938.00,
      date: "after 4 days",
      features: [
        "Quad-lens 108MP camera system",
        "Night mode and 8K video support",
        "Snapdragon processor for fast performance",
        "Large AMOLED screen with HDR10+"
      ]
    },
  ];
  
  const data2 = [
    { page: 7,
      id: 1, 
      title: "Tablet PC", 
      description: "This is a versatile black tablet PC with a large display and a minimalist design. It features on-screen navigation buttons at the bottom and a front-facing camera. Its sleek and portable form factor makes it suitable for both professional and personal use, whether for browsing, work, or media consumption.",
      image: "/Product/Tablets/00.jpg", 
      width: 200, 
      height: 200,
      sale: true, 
      was: "1400.00",
      price: 1700.00,
      date: "tomorrow",
      features: [
        "10.5-inch Full HD touchscreen",
        "Quad-core processor with smooth multitasking",
        "Expandable storage up to 1TB",
        "8MP rear and 5MP front cameras"
      ],
      cart: "cart"
    },
      
    { page: 8,
      id: 2, 
      title: "iPad Pro with Keyboard Case",
      description: "A premium, modern tablet in a protective keyboard case, positioned as a laptop replacement. It has a large, high-resolution screen with thin bezels and a metallic body. This device is ideal for productivity and creative tasks, offering the power of a computer in a tablet's form factor.",
      image: "/Product/Tablets/01.jpg", 
      width: 300, 
      height: 200, 
      price: 5500.00,
      date: "after 2 days",
      features: [
        "12.9-inch Liquid Retina XDR display",
        "Apple M2 chip for pro-level performance",
        "Magic Keyboard with trackpad support",
        "Apple Pencil 2 compatibility"
      ]
    },
      
    { page: 9,
      id: 3, 
      title: "Samsung Tablet with Pen", 
      description: "A large rose gold-colored tablet paired with a matching stylus. The tablet has a slim, sleek design with a high-resolution display, and the stylus allows for precise drawing, writing, and navigation. This device is perfect for artists, students, and professionals who need a versatile tool for both work and creativity.",
      image: "/Product/Tablets/02.jpg", 
      width: 200, 
      height: 200, 
      price: 1400.00,
      date: "after 5 days",
      features: [
        "S Pen included for precise input",
        "AMOLED display with vivid colors",
        "Octa-core processor for fast multitasking",
        "Long-lasting 8000mAh battery"
      ]
    },
      
    { page: 10,
      id: 4, 
      title: "Apple iPad", 
      description: "A classic white Apple iPad with a large, clean screen and the signature home button at the bottom. The device has a minimalist and elegant design, making it a timeless and user-friendly gadget. It's an excellent choice for entertainment, education, and light work.",
      image: "/Product/Tablets/03.png", 
      width: 150, 
      height: 200,
      sale: true, 
      was: "3499.99",
      price: 2999.99,
      date: "after 3 days",
      features: [
        "10.2-inch Retina display",
        "A13 Bionic chip for fast performance",
        "Supports Apple Pencil (1st gen)",
        "Up to 10 hours of battery life"
      ]
    },
  ];

  const data3 = [
    { page: 11,
      id: 1, 
      title: "Macbook Pro M1", 
      description: "A premium, silver-colored laptop known for its powerful performance and elegant design. The Macbook Pro M1 features a high-resolution Retina display, a sleek metal unibody, and a tactile keyboard. It's an ideal choice for creative professionals and students who need a portable yet powerful machine for tasks like video editing, graphic design, and coding.",
      image: "/Product/Computers/00.png",
      width: 250, 
      height: 200, 
      price: 9899.99,
      date: "after 2 days",
      features: [
        "Apple M1 chip with 8-core CPU and GPU",
        "Retina display with True Tone technology",
        "Silent fanless design",
        "Up to 20 hours of battery life"
      ]
    },

    { page: 12,
      id: 2 ,
      title: "Gaming PC Case",
      description: "A sleek and stylish gaming PC case designed to house high-performance computer components. It features an angular, modern design with a mesh front panel for optimal airflow and cooling. The transparent side panel allows you to showcase the internal components, including the custom cooling system and RGB lighting.",
      image: "/Product/Computers/01.png",
      width: 150, 
      height: 200,
      sale:true, 
      was: "399.99",
      price: 289.99,
      date: "tomorrow",
      features: [
        "Tempered glass side panel",
        "Optimized airflow mesh front",
        "Support for up to 360mm liquid cooler",
        "ARGB lighting system compatibility"
      ]
    },

    { page: 13, 
      id: 3 ,
      title: "Black Gaming Laptop",
      description: "A powerful black gaming laptop with a sharp and aggressive design. The keyboard features customizable RGB backlighting, allowing you to personalize your gaming setup. It has a high-resolution display with a thin bezel for an immersive gaming experience. The laptop is built for performance, offering the power to run the latest games smoothly.",
      image: "/Product/Computers/02.png",
      width: 200, 
      height: 200, 
      price: 3749.99,
      date: "tomorrow",
      features: [
        "Intel i9 processor with RTX 4070 GPU",
        "RGB backlit mechanical keyboard",
        "165Hz QHD display",
        "Dual-fan cooling system"
      ]
    },

    { page: 14,
      id: 4 ,
      title: "Modern Laptop", 
      description: "A stylish, thin, and lightweight laptop designed for everyday use. It has a minimalist design with a silver finish and a wide screen with narrow bezels. This laptop is highly portable and perfect for work, school, and media consumption on the go.",
      image: "/Product/Computers/03.png",
      width: 200, 
      height: 200,
      sale: true,  
      was: "3999.99",
      price: 3499.99,
      date: "after 1 week",
      features: [
        "13.3-inch Full HD IPS display",
        "Lightweight aluminum body (1.2 kg)",
        "Intel i5 11th Gen processor",
        "Up to 12 hours of battery life"
      ]
    },
  ];

  const data4 = [
    { page: 15,
      id: 1, 
      title: "Apple Display",  
      description: "A sleek, all-in-one desktop monitor with a minimalist design and a distinctive metallic stand. It's a high-resolution display known for its color accuracy and sharp visuals, making it ideal for graphic design, video editing, and other creative tasks. The black screen and silver stand give it a modern, premium look.",
      image: "/Product/Displays/00.png", 
      width: 200, 
      height: 150, 
      sale:true, 
      was: "13999.99",
      price: 13120.00,
      date: "after 2 days",
      rate: "/stars.png",
      features: [
        "5K Retina display with P3 wide color",
        "600 nits brightness for vivid visuals",
        "Thunderbolt 3 connectivity",
        "Built-in 12MP Ultra Wide camera with Center Stage"
      ]
    },

    { page: 16,
      id: 2 ,
      title: "HD Smart TV",
      description: "A standard high-definition television featuring smart capabilities. The screen displays a vivid landscape with a river and sunset, showcasing its ability to produce rich colors and clear images. Its black frame and unique star-shaped stand give it a distinctive appearance, perfect for a living room or entertainment area.",
      image: "/Product/Displays/01.png", 
      width: 200, 
      height: 150 ,
      price: 2349.99,
      date: "after 3 days",
      features: [
        "Full HD 1080p LED panel",
        "Smart TV apps: Netflix, YouTube, Prime Video",
        "Dolby Audio for immersive sound",
        "Wi-Fi and Bluetooth connectivity"
      ]
    },

    { page: 17,
      id: 3 ,
      title: "4K Ultra HD TV", 
      description: "A high-end television with an ultra-slim, bezel-less design and a sleek black stand. The large screen is shown with a gradient from light gray to black, emphasizing its capacity for deep blacks and a wide range of tones. This TV provides an immersive viewing experience, making it perfect for movies, sports, and gaming.",
      image: "/Product/Displays/02.jpg", 
      width: 200, 
      height: 150,
      sale: true, 
      was: "3199.99",
      price: 2749.99,
      date: "tomorrow",
      features: [
        "4K UHD resolution with HDR10+",
        "Bezel-less design for maximum immersion",
        "Game Mode with low latency",
        "Voice control via Alexa & Google Assistant"
      ]
    },

    { page: 18,
      id: 5 ,
      title: "Modern Desktop Monitor",
      description: "A contemporary computer monitor with a thin black bezel and a metallic, cylindrical stand. The clean, white screen makes it ideal for showcasing designs, websites, or documents. Its stylish and functional design fits well in any modern office or home setup.",
      image: "/Product/Displays/03.jpg", 
      width: 200, 
      height: 150 ,
      price: 2812.00,
      date: "after 1 week",
      features: [
        "27-inch Full HD IPS panel",
        "Adjustable tilt and height stand",
        "Flicker-free and low blue light technology",
        "HDMI and DisplayPort connectivity"
      ]
    },

    { page: 19,
      id: 6 ,
      title: "Curved TV Screen", 
      description: "A large television with a slightly curved screen, shown displaying a vibrant field of flowers under a bright blue sky. The curvature of the screen provides a more immersive viewing experience by filling the viewer's peripheral vision. This TV is a great choice for those seeking a cinematic feel in their own home.",
      image: "/Product/Displays/04.png", 
      width: 200, 
      height: 150,
      sale: true, 
      was: "1299.99",
      price: 999.99,
      date: "after 5 days",
      features: [
        "55-inch curved 4K UHD display",
        "Immersive surround viewing experience",
        "Built-in streaming and voice control",
        "Slim design with elegant stand"
      ]
    },
  ];

  const data5 = [
    { page: 20,
      id: 1, 
      title: "Apple Watch", 
      description: "A modern smartwatch with a sleek, silver face and a white band. The screen displays a variety of colorful app icons, including those for fitness tracking, messaging, and music. This wearable device seamlessly integrates with other Apple products and is designed for users who want to stay connected and monitor their health on the go.",
      image: "/Product/Watches/00.jpg", 
      width: 200, 
      height: 200, 
      price: 999.99,
      date: "tomorrow",
      features: [
        "Always-on Retina display",
        "Heart rate and blood oxygen monitoring",
        "Water resistant up to 50 meters",
        "GPS and cellular connectivity"
      ]
    },
      
    { page: 21,
      id: 2 ,
      title: "Red Over-Ear Headphones",
      description: "A vibrant, red pair of over-ear headphones with a clean, minimalist design. The padded earcups and adjustable headband provide comfort for long listening sessions. These headphones are perfect for music lovers who want high-quality sound and a bold, stylish accessory.",
      image: "/Product/Watches/01.jpg", 
      width: 200, 
      height: 200, 
      price: 120.00,
      date: "after 3 days",
      features: [
        "40mm dynamic drivers for deep bass",
        "Soft memory foam ear cushions",
        "Bluetooth 5.3 wireless connection",
        "Up to 30 hours of playback"
      ]
    },
      
    { page: 22,
      id: 3 ,
      title: "Black Smartwatch", 
      description: "A sleek, all-black smartwatch with a simple and elegant design. The face displays a classic analog clock with a modern twist. The watch has a minimalist, reflective surface and is a great accessory for both casual and formal wear. It's designed for users who want the functionality of a smartwatch in a subtle, timeless design.",
      image: "/Product/Watches/02.jpg", 
      width: 200, 
      height: 200,
      sale: true, 
      was: "600.00",
      price: 300.00,
      date: "after 5 days",
      features: [
        "AMOLED touchscreen with custom watch faces",
        "24/7 heart rate monitoring",
        "Smart notifications and music control",
        "7-day battery life"
      ]
    },
      
    { page: 23,
      id: 4 ,
      title: "Apple Airpods Pro",
      description: "A pair of white, wireless in-ear headphones in their open charging case. These compact earbuds are designed to provide high-quality audio and an immersive listening experience. Their discreet and modern design makes them a popular choice for music, calls, and active lifestyles.",
      image: "/Product/Watches/03.png", 
      width: 200, 
      height: 200, 
      price: 799.99,
      date: "after 2 days",
      features: [
        "Active Noise Cancellation and Transparency Mode",
        "Adaptive EQ for balanced sound",
        "Wireless MagSafe charging case",
        "Up to 6 hours of listening per charge"
      ]
    },
  ],

  data6 = [
    
  ]

  const allData = [data1, data2, data3, data4, data5, data6];

  return new Response(JSON.stringify({ data1, data2, data3, data4, data5, allData }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}