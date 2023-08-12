

# Installation and Setup

Ekub Debter is an open source project, which means you can download it from github for free and set it up or develop it further for free.

Open your terminal/CLI and execute the following commands:-
-  `git clone git@github.com:Anduhailhack/Ekub-Debter.git`
-  `cd Ekub-Debter`
-  `npm i` or `npm install`

# Get started

After installation there are probably 2 ways you wanna go with, development or deployment. Both are documented below.

__For development purposes__
-  `npm run dev`

__For deployment purposes__
-  `npm start`
# End points
To get started with this project it would be easier to start from high level endpoint or root level end points. For example the following are some of the high level endpoints:-

-  `/login`
	-  **@returns - 1**
`    {
	    status: false,
	    result: {
		    msg: "Ekubtegna has not registered. Please register",
		    data: null 
	    }
   }`
If a given Ekubtegna is not found.

	-  **@returns - 2**
`	{
	    status: false,
	    result: {
		    msg: "Incorrect username or password",
		    data: null
	    }
    }`
If a given Ekubtegna is found but if the password did not checkout.

	-  **@returns - 3**
`    {
	    status: true,
	    result: {
		    msg: "login successful",
		    token,
		    currentUser
	    }
    }`
If the given Ekubtegna was found and password checks out.

	-  **@params - 1**
`	{
		phoneNumber : "0911111111",
		password : "0911111111"
	}`
Phone number and password are both mandatory for signing in. For the first time the default password is the phone number that is given during registration itself.

  

 -  `/logout`

	-  **@returns - 1**
`	{
		expires: new Date(Date.now() - 1000),
		httpOnly: true
	}`
Unsets a httpOnly cookie by the name of `jwt`

	-  **@params - 1**
`null`
This endpoint accepts nothing.

 - `/api/version_no/` eg. `/api/v1/` This is a high level API endpoint which contains other endpoints under itself. The following are some of them:-
	 - `/api/v1/addEkubtegna`
		 - **@returns - 1** 
		 `{
		status:  false,
			result: {
			msg: 'Ekubtegna ${name} has already registred'
		}
	}`
		If Ekubtegna with `phoneNumber` already exists in the system. `${name}` refers to the current name given in a parameter, it returns the above object with status code of `400`.
		- **@returns - 2** 
		`{
		status:  false,
		result: {
			msg:  error.message  ||  "Error while creating the Ekubtegna"
		}
	}`
		If unexpected error happened it returns the above object with status code of `400`, `error.message` contains an error raised by a database. If `error.message` is undefined `msg` will be set to the message given above.
	   - **@returns - 3** 
		`{
		status:  true,
		result: {
			msg:  ekubsName  ?  '${name} has beed added in ${ekubsName}'s Ekub'  :  '${name} has been added and not member of any ekub',
			data:  ekubtegna
		}
	}`
		It returns the above object in the case it was successfully added to a database. `${name}` refers to a name of the current ekubtegna being added.  `${ekubsName}` refers to a name of the current Ekub that the ekubtegna is being added to.  This end point returns the above object in case of success thus the http status code will be `200`.
		- **@params - 1**
		`{name, phoneNumber, drawnEkubs}` 
		`name` refers to the name of the Ekubtegna that is being added. It is **required**. 
		`phoneNumber` refers to the phone number of the Ekubtegna that is going to be added to a database. it is **required** and **unique**
		`drawnEkubs` is an object containing an information about the Ekub that the Ekubtegna is currently registering to. If `drawnEkubs.ekubId` is not found in a database the api returns http status code `400` with the **@returns - 1**.
	 - `/api/v1/createEkub`
		-  **@return - 1**
	 `{
		status:  false,
		result: {
			msg:  error.message  ||  "Data creating error /ekub",
			data:  null
		}
	}`
	Returns the above object if the insertion failed for the reasons mentioned in `error.message` or if `error.message` is undefined then the string *Data creation error  /ekub* will be returned.
		 - **@return - 2**
		`{
		status:  true,
		result: {
			msg:  "${ekubsName}'s Ekub has successfully created.",
			data:  ekub
		}
	}`
	Returns the above object if the insertion is successful. http status code will be `200` and `${ekubsName}` stands for the name of the ekub passed as a parameter during the api call.
		- **@params - 1**
		# To be continued here!
	 - `/api/v1/getEkub`
	 - `/api/v1/getEkubtegnas`
	 - `/api/v1/getMe`
	 - `/api/v1/getMyStatus`
	 - `api/v1/payEkub`
