# AI Tool Marketplace

A public marketplace for discovering, sharing, and deploying AI tools and applications. This platform enables developers and users to find, evaluate, and deploy AI tools with community-driven ratings and reviews.

## Features

- **Tool Discovery**: Browse and search through a curated collection of AI tools
- **User Authentication**: Secure user registration and login system
- **Community Ratings**: Rate and review tools to help others make informed decisions
- **Deployment Integration**: One-click deployment to popular cloud platforms
- **Developer API**: Submit and manage your own AI tools
- **Categories & Tags**: Organized tool categorization for easy discovery
- **Real-time Search**: Fast and responsive search functionality

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: JWT tokens
- **Deployment**: Render.com integration
- **Styling**: Tailwind CSS

## Project Structure

```
ai-tool-marketplace/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── utils/      # Utility functions
│   │   └── types/      # TypeScript type definitions
│   ├── public/         # Static assets
│   └── package.json
├── backend/            # Node.js backend API
│   ├── src/
│   │   ├── routes/     # API route handlers
│   │   ├── models/     # Database models
│   │   ├── middleware/ # Express middleware
│   │   ├── services/   # Business logic services
│   │   └── utils/      # Backend utilities
│   └── package.json
├── db/                 # Database related files
│   ├── migrations/     # Database migration files
│   ├── seeds/          # Seed data for development
│   └── schema.sql      # Database schema
└── docs/               # Project documentation
    ├── api.md          # API documentation
    ├── deployment.md   # Deployment guide
    └── contributing.md # Contributing guidelines
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cantycode-svg/ai-tool-marketplace.git
cd ai-tool-marketplace
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend .env file
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials

# Frontend .env file
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your API endpoints
```

4. Set up the database:
```bash
cd backend
npm run db:migrate
npm run db:seed
```

5. Start the development servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Deployment

This project is configured for deployment on Render.com. See `docs/deployment.md` for detailed deployment instructions.

## Contributing

We welcome contributions! Please see `docs/contributing.md` for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Roadmap

- [ ] Basic marketplace functionality
- [ ] User authentication system
- [ ] Tool submission and approval workflow
- [ ] Rating and review system
- [ ] Search and filtering capabilities
- [ ] Deployment integration
- [ ] Payment processing for premium tools
- [ ] Mobile application
- [ ] Advanced analytics dashboard

## Support

For support, please open an issue on GitHub or contact the maintainers.
