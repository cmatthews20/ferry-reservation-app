# ferry-reservation-app

## Cole's Setup Steps

- Create backend folder in project root. Use the following command and follow the prompts to create the frontend with Next.js. Name the next app `frontend` to create the desired frontend/backend separation. 

`npx create-next-app@latest`

- In the frontend root, enter the following command to install the ChakraUI dependencies: 

`npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`

In `_app.js` paste the following (from the ChakraUI website):

'''
// pages/_app.js

import { ChakraProvider } from '@chakra-ui/react'

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
'''

This initializes Chakra so we can use it in the next app. It should now be able to fetch the Chakra components. ChakraUI will help speed up the development process.
