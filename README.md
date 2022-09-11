# popular-github-repo-scanner

### Objective: 
Find the n most popular repositories on GitHub based on the number of forks. For each such repository find the m committees[1] and their commit count.


### How to run the server locally and make an API request?
1. Clone the repo locally: 
```
git clone https://github.com/Mohan40/popular-github-repo-scanner.git
```
2. Change the current working directory to parent folder of the repo using ```cd```. 

3. Install dependencies using:
```
npm i
```
4. Run the server locally using:
```
npm start //This starts the server
```
Note: For dev environment, use:
```
npm test //This restarts the server automatically when any code changes are made
```
5. To make an API request => Open Git Bash (```curl``` should be installed) => Run the below command:
```
curl --location --request GET 'https://popular-repo-github-scanner.herokuapp.com/?organization=<organization>&numberOfPopularRepos=<m>&numberOfPopularCommittiees=<n>'
```

Alternatively, we can run make the request in Postman using the below: 

* API Endpoint URL: 
```
https://popular-repo-github-scanner.herokuapp.com/?organization=<organization>&numberOfPopularRepos=<m>&numberOfPopularCommittiees=<n>
```

* Method: ```GET``` 

* Query parameters: 
```
organization => string => Organization Name
m => integer => Number of top repos to be retrieved based on number of forks
n => integer => Number of top contributors to be retrieved based on number of commits
```


## Sample API Request - Correct Data:
```
curl --location --request GET 'https://popular-repo-github-scanner.herokuapp.com/?organization=microsoft&numberOfPopularRepos=1&numberOfPopularCommittiees=2'
```

## Sample API Response - Successful:
```
{
    "message": [
        {
            "repoName": "plcrashreporter",
            "owner": "microsoft",
            "repoUrl": "https://github.com/microsoft/plcrashreporter",
            "numberOfForks": 489,
            "topCommittees": [
                {
                    "userLoginId": "landonf",
                    "userProfileUrl": "https://github.com/landonf",
                    "numberOfContributions": 1054
                },
                {
                    "userLoginId": "MatkovIvan",
                    "userProfileUrl": "https://github.com/MatkovIvan",
                    "numberOfContributions": 340
                }
            ]
        }
    ]
}
```


## Sample API Request - Incorrect Data:
```
curl --location --request GET 'https://popular-repo-github-scanner.herokuapp.com/?organization=microsoft&numberOfPopularRepos=1&numberOfPopularCommittiees=0'
```

## Sample API Response - Error:
```
{
    "message": "Input Validation Error: [{\"message\":\"\\\"numberOfPopularCommittiees\\\" must be greater than or equal to 1\",\"path\":[\"numberOfPopularCommittiees\"],\"type\":\"number.min\",\"context\":{\"limit\":1,\"value\":0,\"label\":\"numberOfPopularCommittiees\",\"key\":\"numberOfPopularCommittiees\"}}]"
}
```


## API Specification (OpenAPI 3.1.0):
```
{
  "openapi": "3.1.0",
  "info": {
    "title": "popular-repo-github-scanner",
    "description": "Returns the top most popular repositories on GitHub based on the number of forks. For each such repository, the top committees and their commit count.",
    "version": "1.0.0",
    "license": {
      "name": "MIT",
      "url": "https://github.com/Mohan40/popular-github-repo-scanner/blob/main/LICENSE"
    }
  },
  "servers": [
    {
      "url": "https://popular-repo-github-scanner.herokuapp.com"
    }
  ],
  "paths": {
    "/": {
      "get": {
        "description": "GET request to get list of top repos and contributors",
        "parameters": [
          {
            "name": "organization",
            "in": "query",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            },
            "example": "microsoft"
          },
          {
            "name": "numberOfPopularRepos",
            "in": "query",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            },
            "example": "1"
          },
          {
            "name": "numberOfPopularCommittiees",
            "in": "query",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            },
            "example": "4"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "400": {
            "description": "Failure response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### References:
1. Committees are the users who made a commit to the repository. Top m committee means, the top m users who have made the most number of commits to a given repository sorted by the total number of commits in the descending order.