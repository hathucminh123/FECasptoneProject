interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;


}

interface Company {
  id: number;
  name: string;
  overview: {
    title: string;
    description: string;
  };
  jobs: Job[];
  location: string;
  jobOpeningsCount: number;
  image: string; 
}

export const companyData: Company[] = [
  {
    id: 1,
    
    name: "SMG Swiss Marketplace Group",
    overview: {
      title:
        "2024 Vietnam Best IT Companies! Delivering top-performing marketplace platforms in Switzerland.",
      description: `We are an Innovation Centre in Vietnam of SMG Swiss Marketplace Group, a pioneering network of online marketplaces and a leading European digital company that simplifies people’s lives with forward-looking products.
    
Our exciting portfolio currently spans four business areas and includes:
- Real Estate (ImmoScout24, Homegate, Flatfox.ch, Immostreet.ch, home.ch, Acheter-Louer.ch)
- Automotive (AutoScout24, MotoScout24)
- General Marketplaces (anibis.ch, tutti.ch, Ricardo)
- Finance and Insurance (FinancesSout24, moneyland.ch)

OUR PURPOSE:
We simplify lives by connecting and empowering millions of people to make efficient and informed decisions. We aim to be the international reference for digital marketplaces and an exciting place to work, always seeking excellence while driving sustainable choices.

OUR VALUES:
- Better Together
- Aim High
- Act Responsibly`,
    },
    jobs: [
      {
        id: 1,
        title: "Senior / Expert AWS Cloud Engineer (Platform Team)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,500 USD",
        tags: ["AWS", "DevOps", "English"],
        postDate: "Posted 8 days ago",
        hotTag: true,
       
      },
      {
        id: 2,
        title: "Senior/Expert AWS Engineer (Cloud Center of Excellence)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,000 USD",
        tags: ["AWS", "DevSecOps", "DevOps"],
        postDate: "Posted 15 days ago",
        hotTag: false,
      },
      {
        id: 3,
        title: "Senior Fullstack Developer",
        location: "Ho Chi Minh - Da Nang",
        salary: "$2,500 - $4,500 USD",
        tags: ["JavaScript", "React", "Node.js"],
        postDate: "Posted 10 days ago",
        hotTag: true,
      },
    ],
    location: "Ho Chi Minh",
    jobOpeningsCount: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD7rW11p8msxbUW6vgqwP643kpg57TTeIBkA&s", // Sample image URL for the company
  },
  {
    id: 2,
    name: "FPT SOFTWARE",
    overview: {
      title:
        "2024 Vietnam Best IT Companies! Delivering top-performing marketplace platforms in Switzerland.",
      description: `We are an Innovation Centre in Vietnam of SMG Swiss Marketplace Group, a pioneering network of online marketplaces and a leading European digital company that simplifies people’s lives with forward-looking products.
    
Our exciting portfolio currently spans four business areas and includes:
- Real Estate (ImmoScout24, Homegate, Flatfox.ch, Immostreet.ch, home.ch, Acheter-Louer.ch)
- Automotive (AutoScout24, MotoScout24)
- General Marketplaces (anibis.ch, tutti.ch, Ricardo)
- Finance and Insurance (FinancesSout24, moneyland.ch)

OUR PURPOSE:
We simplify lives by connecting and empowering millions of people to make efficient and informed decisions. We aim to be the international reference for digital marketplaces and an exciting place to work, always seeking excellence while driving sustainable choices.

OUR VALUES:
- Better Together
- Aim High
- Act Responsibly`,
    },
    jobs: [
      {
        id: 1,
        title: "Senior / Expert AWS Cloud Engineer (Platform Team)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,500 USD",
        tags: ["AWS", "DevOps", "English"],
        postDate: "Posted 8 days ago",
        hotTag: true,
      },
      {
        id: 2,
        title: "Senior/Expert AWS Engineer (Cloud Center of Excellence)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,000 USD",
        tags: ["AWS", "DevSecOps", "DevOps"],
        postDate: "Posted 15 days ago",
        hotTag: false,
      },
      {
        id: 3,
        title: "Senior Fullstack Developer",
        location: "Ho Chi Minh - Da Nang",
        salary: "$2,500 - $4,500 USD",
        tags: ["JavaScript", "React", "Node.js"],
        postDate: "Posted 10 days ago",
        hotTag: true,
      },
    ],
    location: "Ho Chi Minh",
    jobOpeningsCount: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE0yag0tnwO45YygCMwN23N0zH7ijiYRC1A&s", // Sample image URL for the company
  },
  {
    id: 3,
    name: "Grab",
    overview: {
      title:
        "2024 Vietnam Best IT Companies! Delivering top-performing marketplace platforms in Switzerland.",
      description: `We are an Innovation Centre in Vietnam of SMG Swiss Marketplace Group, a pioneering network of online marketplaces and a leading European digital company that simplifies people’s lives with forward-looking products.
    
Our exciting portfolio currently spans four business areas and includes:
- Real Estate (ImmoScout24, Homegate, Flatfox.ch, Immostreet.ch, home.ch, Acheter-Louer.ch)
- Automotive (AutoScout24, MotoScout24)
- General Marketplaces (anibis.ch, tutti.ch, Ricardo)
- Finance and Insurance (FinancesSout24, moneyland.ch)

OUR PURPOSE:
We simplify lives by connecting and empowering millions of people to make efficient and informed decisions. We aim to be the international reference for digital marketplaces and an exciting place to work, always seeking excellence while driving sustainable choices.

OUR VALUES:
- Better Together
- Aim High
- Act Responsibly`,
    },
    jobs: [
      {
        id: 1,
        title: "Senior / Expert AWS Cloud Engineer (Platform Team)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,500 USD",
        tags: ["AWS", "DevOps", "English"],
        postDate: "Posted 8 days ago",
        hotTag: true,
      },
      {
        id: 2,
        title: "Senior/Expert AWS Engineer (Cloud Center of Excellence)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,000 USD",
        tags: ["AWS", "DevSecOps", "DevOps"],
        postDate: "Posted 15 days ago",
        hotTag: false,
      },
      {
        id: 3,
        title: "Senior Fullstack Developer",
        location: "Ho Chi Minh - Da Nang",
        salary: "$2,500 - $4,500 USD",
        tags: ["JavaScript", "React", "Node.js"],
        postDate: "Posted 10 days ago",
        hotTag: true,
      },
    ],
    location: "Ho Chi Minh",
    jobOpeningsCount: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVFHy4c9-5VTzyt9I7kGakNAwHywDtMRbpA&s", 
  },
  {
    id: 4,
    name: "VNG",
    overview: {
      title:
        "2024 Vietnam Best IT Companies! Delivering top-performing marketplace platforms in Switzerland.",
      description: `We are an Innovation Centre in Vietnam of SMG Swiss Marketplace Group, a pioneering network of online marketplaces and a leading European digital company that simplifies people’s lives with forward-looking products.
    
Our exciting portfolio currently spans four business areas and includes:
- Real Estate (ImmoScout24, Homegate, Flatfox.ch, Immostreet.ch, home.ch, Acheter-Louer.ch)
- Automotive (AutoScout24, MotoScout24)
- General Marketplaces (anibis.ch, tutti.ch, Ricardo)
- Finance and Insurance (FinancesSout24, moneyland.ch)

OUR PURPOSE:
We simplify lives by connecting and empowering millions of people to make efficient and informed decisions. We aim to be the international reference for digital marketplaces and an exciting place to work, always seeking excellence while driving sustainable choices.

OUR VALUES:
- Better Together
- Aim High
- Act Responsibly`,
    },
    jobs: [
      {
        id: 1,
        title: "Senior / Expert AWS Cloud Engineer (Platform Team)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,500 USD",
        tags: ["AWS", "DevOps", "English"],
        postDate: "Posted 8 days ago",
        hotTag: true,
      },
      {
        id: 2,
        title: "Senior/Expert AWS Engineer (Cloud Center of Excellence)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,000 USD",
        tags: ["AWS", "DevSecOps", "DevOps"],
        postDate: "Posted 15 days ago",
        hotTag: false,
      },
      {
        id: 3,
        title: "Senior Fullstack Developer",
        location: "Ho Chi Minh - Da Nang",
        salary: "$2,500 - $4,500 USD",
        tags: ["JavaScript", "React", "Node.js"],
        postDate: "Posted 10 days ago",
        hotTag: true,
      },
    ],
    location: "Ho Chi Minh",
    jobOpeningsCount: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROuDMBGjxgRbffQ99A38_tQl--CGYuQWdP5Q&s", 
  },
  {
    id: 5,
    name: "MB Bank",
    overview: {
      title:
        "2024 Vietnam Best IT Companies! Delivering top-performing marketplace platforms in Switzerland.",
      description: `We are an Innovation Centre in Vietnam of SMG Swiss Marketplace Group, a pioneering network of online marketplaces and a leading European digital company that simplifies people’s lives with forward-looking products.
    
Our exciting portfolio currently spans four business areas and includes:
- Real Estate (ImmoScout24, Homegate, Flatfox.ch, Immostreet.ch, home.ch, Acheter-Louer.ch)
- Automotive (AutoScout24, MotoScout24)
- General Marketplaces (anibis.ch, tutti.ch, Ricardo)
- Finance and Insurance (FinancesSout24, moneyland.ch)

OUR PURPOSE:
We simplify lives by connecting and empowering millions of people to make efficient and informed decisions. We aim to be the international reference for digital marketplaces and an exciting place to work, always seeking excellence while driving sustainable choices.

OUR VALUES:
- Better Together
- Aim High
- Act Responsibly`,
    },
    jobs: [
      {
        id: 1,
        title: "Senior / Expert AWS Cloud Engineer (Platform Team)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,500 USD",
        tags: ["AWS", "DevOps", "English"],
        postDate: "Posted 8 days ago",
        hotTag: true,
      },
      {
        id: 2,
        title: "Senior/Expert AWS Engineer (Cloud Center of Excellence)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,000 USD",
        tags: ["AWS", "DevSecOps", "DevOps"],
        postDate: "Posted 15 days ago",
        hotTag: false,
      },
      {
        id: 3,
        title: "Senior Fullstack Developer",
        location: "Ho Chi Minh - Da Nang",
        salary: "$2,500 - $4,500 USD",
        tags: ["JavaScript", "React", "Node.js"],
        postDate: "Posted 10 days ago",
        hotTag: true,
      },
    ],
    location: "Ho Chi Minh",
    jobOpeningsCount: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5SIhTuQ-ZiEjcWV7GQoFAU1YIbsrFLQZ_w&s", 
  },
  {
    id: 6,
    name: "Viettel",
    overview: {
      title:
        "2024 Vietnam Best IT Companies! Delivering top-performing marketplace platforms in Switzerland.",
      description: `We are an Innovation Centre in Vietnam of SMG Swiss Marketplace Group, a pioneering network of online marketplaces and a leading European digital company that simplifies people’s lives with forward-looking products.
    
Our exciting portfolio currently spans four business areas and includes:
- Real Estate (ImmoScout24, Homegate, Flatfox.ch, Immostreet.ch, home.ch, Acheter-Louer.ch)
- Automotive (AutoScout24, MotoScout24)
- General Marketplaces (anibis.ch, tutti.ch, Ricardo)
- Finance and Insurance (FinancesSout24, moneyland.ch)

OUR PURPOSE:
We simplify lives by connecting and empowering millions of people to make efficient and informed decisions. We aim to be the international reference for digital marketplaces and an exciting place to work, always seeking excellence while driving sustainable choices.

OUR VALUES:
- Better Together
- Aim High
- Act Responsibly`,
    },
    jobs: [
      {
        id: 1,
        title: "Senior / Expert AWS Cloud Engineer (Platform Team)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,500 USD",
        tags: ["AWS", "DevOps", "English"],
        postDate: "Posted 8 days ago",
        hotTag: true,
      },
      {
        id: 2,
        title: "Senior/Expert AWS Engineer (Cloud Center of Excellence)",
        location: "Remote - Ho Chi Minh",
        salary: "$3,000 - $5,000 USD",
        tags: ["AWS", "DevSecOps", "DevOps"],
        postDate: "Posted 15 days ago",
        hotTag: false,
      },
      {
        id: 3,
        title: "Senior Fullstack Developer",
        location: "Ho Chi Minh - Da Nang",
        salary: "$2,500 - $4,500 USD",
        tags: ["JavaScript", "React", "Node.js"],
        postDate: "Posted 10 days ago",
        hotTag: true,
      },
    ],
    location: "Ho Chi Minh",
    jobOpeningsCount: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ48iP94CboAHzDCLg46mFLeyqXGi7jXri99w&s", 
  },
];


interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;
  companyId?: number;
  companyImage?: string; 
}

export const jobData: Job[] = [
  {
    id: 1,
    title: "Senior / Expert AWS Cloud Engineer (Platform Team)",
    location: "Remote - Hồ Chí Minh",
    salary: "$3,000 - $5,500 USD",
    tags: ["AWS", "DevOps", "English"],
    postDate: "Posted 8 days ago",
    hotTag: true,
    companyId: 1,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD7rW11p8msxbUW6vgqwP643kpg57TTeIBkA&s",
  },
  {
    id: 2,
    title: "Senior/Expert AWS Engineer (Cloud Center of Excellence)",
    location: "Remote - Hồ Chí Minh",
    salary: "$3,000 - $5,000 USD",
    tags: ["AWS", "DevSecOps", "DevOps"],
    postDate: "Posted 15 days ago",
    hotTag: false,
    companyId: 1,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD7rW11p8msxbUW6vgqwP643kpg57TTeIBkA&s",
  },
  {
    id: 3,
    title: "Senior Fullstack Developer",
    location: " Hồ Chí Minh - Da Nang",
    salary: "$2,500 - $4,500 USD",
    tags: ["JavaScript", "React", "Node.js"],
    postDate: "Posted 10 days ago",
    hotTag: true,
    companyId: 2,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE0yag0tnwO45YygCMwN23N0zH7ijiYRC1A&s",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    location: "Remote - Vietnam",
    salary: "$2,000 - $4,000 USD",
    tags: ["Figma", "UI/UX", "Design"],
    postDate: "Posted 5 days ago",
    hotTag: false,
    companyId: 2,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE0yag0tnwO45YygCMwN23N0zH7ijiYRC1A&s",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    location: "Đà Nẵng",
    salary: "$2,800 - $4,800 USD",
    tags: ["CI/CD", "Kubernetes", "Docker"],
    postDate: "Posted 12 days ago",
    hotTag: true,
    companyId: 3,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVFHy4c9-5VTzyt9I7kGakNAwHywDtMRbpA&s",
  },
  {
    id: 6,
    title: "Product Manager",
    location: " Hồ Chí Minh",
    salary: "$3,500 - $6,000 USD",
    tags: ["Agile", "Scrum", "Management"],
    postDate: "Posted 4 days ago",
    hotTag: false,
    companyId: 3,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVFHy4c9-5VTzyt9I7kGakNAwHywDtMRbpA&s",
  },
  {
    id: 7,
    title: "Backend Engineer",
    location: "Remote - Hanoi",
    salary: "$3,000 - $6,000 USD",
    tags: ["Java", "Spring Boot", "Microservices"],
    postDate: "Posted 7 days ago",
    hotTag: false,
    companyId: 4,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROuDMBGjxgRbffQ99A38_tQl--CGYuQWdP5Q&s",
  },
  {
    id: 8,
    title: "Senior Data Scientist",
    location: "Remote - Vietnam",
    salary: "$4,000 - $7,000 USD",
    tags: ["Python", "Machine Learning", "Data Science"],
    postDate: "Posted 3 days ago",
    hotTag: true,
    companyId: 4,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROuDMBGjxgRbffQ99A38_tQl--CGYuQWdP5Q&s",
  },
  {
    id: 9,
    title: "Frontend Developer",
    location: "Ho Chi Minh - Da Nang",
    salary: "$2,500 - $4,500 USD",
    tags: ["React", "JavaScript", "CSS"],
    postDate: "Posted 9 days ago",
    hotTag: false,
    companyId: 5,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5SIhTuQ-ZiEjcWV7GQoFAU1YIbsrFLQZ_w&s",
  },
  {
    id: 10,
    title: "Database Administrator",
    location: "Hanoi",
    salary: "$3,200 - $5,200 USD",
    tags: ["MySQL", "Database", "SQL"],
    postDate: "Posted 6 days ago",
    hotTag: true,
    companyId: 5,
    companyImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5SIhTuQ-ZiEjcWV7GQoFAU1YIbsrFLQZ_w&s",
  },
];
