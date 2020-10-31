# graphql-api

## Overview

This package manages all aspects required to develop, build and test the GraphQL api, which uses [Hasura](https://hasura.io/).

## Usage

Run `yarn dev` to start the Graph API at port 5000.

**Note** You'll require a `.env.dev` file for the api to run

## Environment variables

| Name              | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| DB_CONNECTION_URI | Full URI path (protocol, user, password, host and port) to the DB |
