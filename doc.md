# Installation and Setup
Ekub Debter is an open source project, which means you can download it from github for free and set it up or develop it further for free.
Open your terminal/CLI and execute the following commands:-
- `git clone git@github.com:Anduhailhack/Ekub-Debter.git`
- `cd Ekub-Debter`
- `npm i` or `npm install`

# Get started
After installation there are probably 2 ways you wanna go with, development or deployement. Both are documented below.
__For development purposes__
- `npm run dev` 

__For deployement purposes__
- `npm start`

To get started with this project it would be easier to start from high level endpoint or root level end points. For example the following are some of the high level endpoints:-
- `/login` 
    - **@returns** 
    `
        {
            status: false,
               result: {
                msg: "Ekubtegna has not registered. Please register",
                data: null
            }
        }
    `
    If a given Ekubtegna is not found.

    - **@returns** 
    `
        {
            status: false,
            result: {
                msg: "Incorrect username or password",
                data: null
            }
        }
    `
    If a given Ekubtegna is found but if the password did not checkout.

    - **@returns** 
    `
        {
            status: true,
            result: {
                msg: "login successful",
                token,
                currentUser
            }
        }
    `
    If the given Ekubtegna was found and password checks out.

    - **@params** 
    `
        {
            phoneNumber : "0911111111",
            password : "0911111111"
        }
    `
    Phone number and password are both mandatory for signing in. For the first time the default password is the phone number that is given during registration itself.

- `/logout`
    - **@returns** 
    `
        {
            expires: new Date(Date.now() - 1000),
            httpOnly: true
        }
    `
    Unsets a httpOnly cookie by the name of `jwt`

    - **@params** 
    `
        null
    `
    This endpoint accepts nothing.
