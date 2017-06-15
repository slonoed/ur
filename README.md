# ur

## How to develop

* Pull repo.
* Use Nodejs 8.
* Run `npm install`
* Run `npm run test-w`
* Change [index.js](index.js) to pass tests in [test.js](./test.js)

## What we want to achieve

I'm looking for javascript router with next requirements:

* Works in browser
* Works in Nodejs
* Don't depend on any framework
* Can generate URL
* Small (as possible)

This is a scheme of router
```

                                  URL
                       ----------------------
                        |                  ^
                        V                  |
                    ––––––––––––––––––––––––––––––––––
    ––––––––––––    |   |                  |         |
    |    C     | => |  f(C,URL)  ROUTER   g(C,DATA)  |
    ––––––––––––    |   |                  |         |
                    ––––––––––––––––––––––––––––––––––
                        |                  ^
                        V                  |
                       ----------------------
                                 DATA

```
Where:

* **C** — router config. Contains all routes with params. It can be JSON or JS data structure. It maps URL parts to data and vice verse. You can imagine React router config.
* **URL** – URL string (rfc3986).
* **DATA** — JS data structure (Object/Tree/Array/etc).
* **ROUTER** — blackbox I'm lookign for
* **f** – router function, convert URL to data
* **g** – router function, convert DATA to URL

The most important part is URL-DATA mapping:

```
g(C, f(C, URL)) = URL
```

Functions **f** and **g** are inverses of one another

Nice example of the router like this is a [bidi](https://github.com/juxt/bidi), but it uses clojurescript. I need plain JS.

[router-parser](https://github.com/rcs/route-parser) looks like what I want, but it doesn't work with complex URL config.

## Routes
Config = RoutePair
RoutePair = [Pattern Matched]
Pattern = true | false | String | Regex | [PatternSegment+]
PatternSegment = String | Regex
Matched = RoutePair | String


