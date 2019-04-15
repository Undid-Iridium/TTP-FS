# What is TTP-FS?

This application is being created to solve the following EPICS/STORIES 

1) As a user I want to create a new account with my name, email, and password so
that I can buy and trade stocks.
   * Default the user’s cash account balance to $5000.00 USD.
A user can only register once with any given email.
2) As a user I want to authenticate via email and password so that I can access my
account.
3) As a user I want to buy shares of stock at its current price by specifying its
ticker symbol and number of shares so that I can invest.    
   * A user can only buy whole number quantities of shares.  
   * A user can only buy shares if they have enough cash in their account for a
given purchase.  
   * A user can only buy shares if the ticker symbol is valid.
4) As a user I want to view a list of all transactions I’ve made to date (trades) so that
I can perform an audit.  

5) As a user I want to view a list of all the stocks I own along with their current
values so that I can review performance.
   * Current values should be based on the latest price and quantity owned for a
given stock.
6) As a user I’d like to see the font color of stock symbols and current prices in my
portfolio change dynamically to indicate performance.  
   * Display red when the current price is less than the day’s open price.
   * Display grey when the current price is equal to the day’s open price.
   * Display green when the current price is greater than the day’s open price.

# Features (including stats that we will keep track of)
  - Encyption for Login
  - Gather Stock Data
  - Display Stock Data
  - WIP

# Dependency
* npm 6.7.0 (All the other sub dependencies are in various package.json files, doing an 'npm install' on that directory will install the dependencies)

  For Ubuntu 16.04.6 LTS bionic:
```shell
sudo apt-get update --yes
sudo apt-get install npm --yes
```


# How to run

  1. In one terminal, run this to get the server running (only need to do npm install on your first time, to install all the node_modules):
  ```bash
  cd stockapptpp/backend
  npm install   
  npm start
  ```
  2. In a second terminal, run this to get the front end running (only need to do npm install on your first time, to install all the node_modules):
  ```bash
  cd stockapptpp/src
  npm install
  npm start
  ```

  3. Now go to your browser and open http://localhost:3000/
    Voila!

  *NOTE*: When npm start on REACT, you maybe run into this error:
  ```
  fs.js:1384
    throw error;
  ``` 
  To fix:  [Reference](https://github.com/facebook/jest/issues/3254)

  * add 'fs.inotify.max_user_watches=20000' without the single quotes into your /etc/sysctl.conf on the very last line. Change the number to however much you want. The error aboves results from the number being too small, so change it to a big enough number. How big? I don't know, depends on how much files you have in your REACT App.
  * After you edit that file, run the following to load in the [sysctl](https://linux.die.net/man/8/sysctl) setting from /etc/sysctl.conf
  ```shell
  sudo sysctl -p
  ``` 

# How to contribute
  PLEASE FORK, and follow a proper git work flow
  when you have a feature done, do a PR
  PLEASE DO NOT MAKE DIRECT EDITS TO THIS REPO

  If you see any bugs, on documentations, codes, etc please open an issue describing the bug. Thanks!

  Refer to [CONTRIBUTING.md](./CONTRIBUTING.md)


