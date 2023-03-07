## ENV 
1. cp .env.example .env.local
2. modify NEXT_PUBLIC_API_URL env for Backend API URL
3. modify NEXTAUTH_URL env
4. modify NEXTAUTH_SECRET env
5. modify NEXT_CREDENTIALS_CLIENT_SECRET env

## How To Run

1. Install [Node.js] >= v14.20.1 (https://nodejs.org/en/download/)
3. yarn (or npm install)
4. yarn dev (for runing devmode)
5. yarn build (for building production)
6. yarn start (for serving production)


## Folder Structure
  
      .
      ├── ...
      ├── src                     # Source files (alternatively `lib` or `app`)
      │   ├── __tests__           # TESTs Dir
      │   ├── components          # Components Dir
      │   ├── configs             # Config Dir
      │   ├── providers           # Custom Context and Providers
      │   ├── styles              # Styles Dir
      │   ├── types               # Types definition Dir
      │   └── utils               # Utils Dir
      ├── ...
      ├── pages                   # Page Dir
      ├── .env.example            # Env example file
      ├── .gitignore              # Git ignore file
      ├── jest.config.js          # Jest config file
      ├── package.json            # Package file
      ├── README.md               # Readme file
      ├── tsconfig.json           # Typescript config file
      ├── yarn.lock               # Yarn lock file
      └── ...

