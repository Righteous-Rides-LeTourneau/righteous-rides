# Righteous Rides

**Project Name:** Cars++

**Contributers:** Micah McCloy | Zach Pelham | Carter Hidalgo

**Client and Project Information:** Righteous Rides – a non-profit Christian missions organization that provides car rentals for missionaries on furlough in the states at a cheap price. 
Righteous Rides uses three main pieces of software for their normal business operations: Cars Plus for rental agreement processing and van scheduling, Blackbaud Raiser’s 
Edge NXT for donation handling and customer tracking, and Quickbooks for financial accounting. All are used together for successful operations.
Righteous Rides is currently getting Cars Plus for free due to a deal they had with the previous owners. However, Cars Plus is under new leadership which could end their free 
deal which would lead to them having to pay for this software. Righteous Rides would not be able to afford this software.
There are also problems with missing functionality and a lack of easy integration with Blackbaud and Quickbooks. This is causing a duplication of effort, repeating work between 
tools to have consistent records costing unnecessary time and resources.
Additionally, the UI of Cars Plus is very difficult to understand as it only has a command line user interface and is quite unintuitive. Because of this, only a select few people in the organization 
can use this tool because it would cost time and resources for training on this software.

**Software Description:** This software will take user information from Blackbaud for scheduling and asset allocation. The program will pair users with fleet vehicles using a GUI so that 
when/if Cars Plus is no longer accessible, Righteous Rides employees will still have a method for pairing vehicles with customers. 

**TODO:** Everything except this *very* comprehensive readme.

## Developer Setup
Install Node.js and npm 

- Can check that npm is installed and in path by running `npm` in terminal

Clone this repository

Navigate to the root of the project and run `npm install` to install dependencies

Once dependencies are installed:
 - Run `npm run electron:serve` to locally run Electron app in development environment
 - Run `npm run electron:build` to create a build and distribution of Electron app

