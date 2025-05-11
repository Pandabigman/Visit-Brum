const places = [
    {
      id:"1",
      name: "Winterbourne House & Garden",
      profilePic: "/images/winterbourne/main.jpeg",
      extraPics: [
        "/images/winterbourne/1.jpeg",
        "/images/winterbourne/2.jpeg",
      ],
      rating: 4.8,
      location: "58 Edgbaston Park Rd, Birmingham B15 2RT",
      type: "Nature & History",
      shortDescription: "Edwardian house with peaceful botanical gardens.",
      longDescription: "Tucked behind the University of Birmingham, Winterbourne is a restored Edwardian family home surrounded by 7 acres of botanical gardens. It's ideal for calm walks, hidden study spots, or exploring rare plant species.",
      uniqueExperiences: [
        "Peaceful garden walks",
        "Explore Edwardian rooms",
        "Hidden study nooks"
      ]
    },
    {
      id:"2",
      name: "Moseley Bog",
      profilePic: "../images/moseleybog/main.jpeg",
      extraPics: [
        "../images/moseleybog/1.jpeg",
        "../images/moseleybog/2.jpeg"
      ],
      rating: 4.7,
      location: "Yardley Wood Rd, Birmingham B13 9JX",
      type: "Nature & Mythology",
      shortDescription: "Ancient woodland that inspired Tolkien's Middle Earth.",
      longDescription: "A wild and mysterious woodland that's part of Birmingham's green belt, and a childhood playground of J.R.R. Tolkien. Ideal for nature lovers and Tolkien fans alike.",
      uniqueExperiences: [
        "Walk the paths Tolkien once did",
        "Birdwatching",
        "Peaceful escape from the city"
      ]
    },
    {
      id:"3",
      name: "The Coffin Works",
      profilePic: "../images/coffinworks/main.jpeg",
      extraPics: [
        "../images/coffinworks/1.jpeg",
        "../images/coffinworks/2.jpeg"
      ],
      rating: 4.6,
      location: "13-15 Fleet St, Birmingham B3 1JP",
      type: "Museum",
      shortDescription: "A preserved Victorian coffin fittings factory.",
      longDescription: "A quirky and surprisingly fun museum that shows how coffins were made for royalty and famous figures. It preserves the original machinery and style of the factory.",
      uniqueExperiences: [
        "See real coffin fittings",
        "Learn about Birmingham's industrial past",
        "Explore a real Victorian factory"
      ]
    },
    {
      id:"4",
      name: "Sarehole Mill",
      profilePic: "../images/sarehole/main.jpeg",
      extraPics: [
        "../images/sarehole/1.jpeg",
        "../images/sarehole/2.jpeg"
      ],
      rating: 4.5,
      location: "Cole Bank Rd, Birmingham B13 0BD",
      type: "Heritage Site",
      shortDescription: "A Tolkien-connected working watermill.",
      longDescription: "A beautiful heritage site and working watermill that inspired Tolkien’s Shire. You can see flour being milled, explore the grounds, and learn about local history.",
      uniqueExperiences: [
        "See working watermill machinery",
        "Tolkien heritage site",
        "Buy fresh-milled flour"
      ]
    },
    {
      id:"5",
      name: "Tiger Bites Pig",
      profilePic: "../images/tigerbites/main.jpeg",
      extraPics: [
        "../images/tigerbites/1.jpeg",
        "../images/tigerbites/2.jpeg"
      ],
      rating: 4.9,
      location: "34 Stephenson St, Birmingham B2 4BH",
      type: "Street Food",
      shortDescription: "Tiny bao bun spot with big flavour.",
      longDescription: "A hole-in-the-wall gem that serves up Asian bao buns and rice bowls with serious flavour. Quick, delicious, and full of character.",
      uniqueExperiences: [
        "Gourmet bao buns",
        "Fast and friendly service",
        "Perfect pre-train food stop"
      ]
    },
    {
      id:"6",
      name: "The Juke",
      profilePic: "../images/thejuke/main.jpeg",
      extraPics: [
        "../images/thejuke/1.jpeg",
        "../images/thejuke/2.jpeg"
      ],
      rating: 4.8,
      location: "16 York Rd, Birmingham B14 7RZ",
      type: "Bar & Music",
      shortDescription: "Microbar with vinyl vibes and craft beer.",
      longDescription: "An intimate bar where you can play from a huge vinyl collection while enjoying curated local craft beers. It’s small, friendly, and very Birmingham.",
      uniqueExperiences: [
        "Pick your own vinyl",
        "Discover new local brews",
        "Chill and chat in a cosy spot"
      ]
    },
    {
      id:"7",
      name: "Tilt",
      profilePic: "../images/tilt/main.jpeg",
      extraPics: [
        "../images/tilt/1.jpeg",
        "../images/tilt/2.jpeg"
      ],
      rating: 4.7,
      location: "2 City Arcade, Birmingham B2 4TX",
      type: "Coffee & Arcade",
      shortDescription: "Craft coffee, beer, and retro pinball machines.",
      longDescription: "Tilt blends a high-end coffee shop, craft beer bar, and retro arcade all in one. Perfect for working by day and geeking out by night.",
      uniqueExperiences: [
        "Play vintage pinball",
        "Single-origin coffee",
        "Craft beer rotation"
      ]
    },
    {
      id:"8",
      name: "The Electric Cinema",
      profilePic: "../images/electric/main.jpeg",
      extraPics: [
        "../images/electric/1.jpeg",
        "../images/electric/2.jpeg"
      ],
      rating: 4.6,
      location: "47-49 Station St, Birmingham B5 4DY",
      type: "Cinema",
      shortDescription: "UK’s oldest working cinema with sofa service.",
      longDescription: "Watch films the old-fashioned way, in Birmingham's beautifully restored art deco cinema. Order cocktails by text while lounging in a sofa seat.",
      uniqueExperiences: [
        "Text-to-seat drinks",
        "Historic atmosphere",
        "Film screenings with a twist"
      ]
    },
    {
        id:"9",
        name: "Digbeth Graffiti Walk",
        profilePic: "../images/digbeth/main.jpeg",
        extraPics: [
          "../images/digbeth/1.jpeg",
          "../images/digbeth/2.jpeg"
        ],
        rating: 4.9,
        location: "Digbeth, Birmingham B9",
        type: "Street Art",
        shortDescription: "Self-guided tour of world-class urban art.",
        longDescription: "Digbeth is covered in stunning and constantly evolving street art. The graffiti walk takes you through industrial streets filled with murals, often used in music videos and fashion shoots.",
        uniqueExperiences: [
          "Explore giant murals",
          "See work by local and global artists",
          "Perfect Instagram spots"
        ]
      },
      {
        id:"10",
        name: "Cherry Reds",
        profilePic: "../images/cherryreds/main.jpeg",
        extraPics: [
          "../images/cherryreds/1.jpeg",
          "../images/cherryreds/2.jpeg"
        ],
        rating: 4.5,
        location: "88–92 John Bright St, Birmingham B1 1BN",
        type: "Café Bar",
        shortDescription: "Retro café-bar with board games and vegan food.",
        longDescription: "Cherry Reds offers homey vibes, local beer, all-day brunch, and a stash of board games. Ideal for a chill night out or a low-key daytime meet.",
        uniqueExperiences: [
          "Play board games while dining",
          "Try the vegan pancakes",
          "Homemade everything"
        ]
      },
      {
        id:"11",
        name: "The Mockingbird Cinema & Kitchen",
        profilePic: "../images/mockingbird/main.jpeg",
        extraPics: [
          "../images/mockingbird/1.jpeg",
          "../images/mockingbird/2.jpeg"
        ],
        rating: 4.6,
        location: "Custard Factory, Gibb St, Birmingham B9 4AA",
        type: "Independent Cinema",
        shortDescription: "Boutique cinema with comfort food and themed screenings.",
        longDescription: "Part of the Custard Factory arts complex, the Mockingbird offers indie, cult, and mainstream films in a cosy venue that doubles as a bar and eatery.",
        uniqueExperiences: [
          "Watch cult classics",
          "Grab loaded fries or a burger",
          "Occasional karaoke or quiz nights"
        ]
      },
      {
        id:"12",
        name: "Cannon Hill Park Boating Lake",
        profilePic: "../images/cannonhill/main.jpeg",
        extraPics: [
          "../images/cannonhill/1.jpeg",
          "../images/cannonhill/2.jpeg"
        ],
        rating: 4.4,
        location: "Russell Rd, Birmingham B13 8RD",
        type: "Park Activity",
        shortDescription: "Boating fun in a scenic Victorian park.",
        longDescription: "This park has more than just lawns and ducks — rent a swan-shaped pedal boat and paddle across the lake, or visit the mini-golf and MAC arts centre nearby.",
        uniqueExperiences: [
          "Swan-shaped pedal boats",
          "Park festivals and shows",
          "Scenic riverside trails"
        ]
      },
      {
        id:"13",
        name: "Ikon Gallery",
        profilePic: "../images/ikon/main.jpeg",
        extraPics: [
          "../images/ikon/1.jpeg",
          "../images/ikon/2.jpeg"
        ],
        rating: 4.3,
        location: "1 Oozells Square, Brindleyplace, Birmingham B1 2HS",
        type: "Art Gallery",
        shortDescription: "Contemporary art in a stunning neo-gothic school building.",
        longDescription: "This free gallery features changing exhibitions of cutting-edge modern art. It also has a cute little café and is set inside a former Victorian school.",
        uniqueExperiences: [
          "Modern art in gothic architecture",
          "Often interactive exhibits",
          "Hidden canal-side seating"
        ]
      },
      {
        id:"14",
        name: "Martineau Gardens",
        profilePic: "../images/martineau/main.jpeg",
        extraPics: [
          "../images/martineau/1.jpeg",
          "../images/martineau/2.jpeg"
        ],
        rating: 4.6,
        location: "27 Priory Rd, Birmingham B5 7UG",
        type: "Community Garden",
        shortDescription: "Organic garden and oasis near the city.",
        longDescription: "Run by volunteers, this tranquil space features wildlife, fruit trees, and eco-education — just minutes from the city centre but feeling like a rural retreat.",
        uniqueExperiences: [
          "Peaceful reading spots",
          "Butterfly gardens",
          "Community-run events"
        ]
      },
      {
        id:"15",
        name: "Roundhouse Birmingham",
        profilePic: "../images/roundhouse/main.jpeg",
        extraPics: [
          "../images/roundhouse/1.jpeg",
          "../images/roundhouse/2.jpeg"
        ],
        rating: 4.5,
        location: "Roundhouse Rd, Sheepcote St, Birmingham B16 8AE",
        type: "Heritage & Tours",
        shortDescription: "Explore Birmingham by kayak or canal walk.",
        longDescription: "An unusual restored horseshoe-shaped building offering guided kayaking tours, cycle hire, and fascinating stories about Birmingham’s industrial waterways.",
        uniqueExperiences: [
          "Kayak the canals",
          "Rent bikes or paddleboards",
          "Heritage tours with a twist"
        ]
      },
      {
        id:"16",
        name: "Lapworth Museum of Geology",
        profilePic: "../images/lapworth/main.jpeg",
        extraPics: [
          "../images/lapworth/1.jpeg",
          "../images/lapworth/2.jpeg"
        ],
        rating: 4.7,
        location: "University of Birmingham, Edgbaston B15 2TT",
        type: "Museum",
        shortDescription: "Explore fossils, rocks and prehistoric creatures.",
        longDescription: "This free museum is part of the University of Birmingham and is full of dinosaurs, crystals, and geology exhibits — all presented in a beautifully modernised space.",
        uniqueExperiences: [
          "Dinosaur skeletons up close",
          "Interactive earthquake simulator",
          "Explore ancient fossils"
        ]
      }
      

  ];
  
  export default places;
  