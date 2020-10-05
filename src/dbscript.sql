DROP DATABASE wallet;
CREATE DATABASE wallet;
use wallet;
CREATE TABLE users (
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(30) NOT NULL,
    password varchar(50) NOT NULL,
    PRIMARY KEY (user_id)
);
CREATE TABLE countries (
    country_id int NOT NULL,
    name varchar(50) NOT NULL,
    alpha3code varchar(3) NOT NULL,
    PRIMARY KEY (country_id)
);
CREATE TABLE users_data (
    user_id int NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50),
    phone_number int(20),
    country_id int,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (country_id) REFERENCES countries(country_id)
);
CREATE TABLE currencies (
    currency_id int NOT NULL,
    name varchar(50) NOT NULL,
    code varchar(10) NOT NULL,
    PRIMARY KEY (currency_id)
);
CREATE TABLE wallets (
    wallet_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    name varchar(50) NOT NULL,
    amount float(50) NOT NULL,
    currency_id int NOT NULL,
    PRIMARY KEY (wallet_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (currency_id) REFERENCES currencies(currency_id)
);
CREATE TABLE history (
	entry_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    information text NOT NULL,
    entry_date datetime NOT NULL,
    PRIMARY KEY (entry_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);