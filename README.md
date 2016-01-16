# no alternative joi

I've had to fixed bugs twice related to Joi alternatives which led me to the conclusion they're a bit of a nightmare. Either people don't know how to use them properly or they're confusing. However, both times it didn't seem like a problem with alternatives per se so I thought I'd see if they work how I expected them to...

...and they do! Huzzah!

So now I can conclude instead:

* as the docs state, don't use required with when and alternatives because undefined *WILL* trip you up
* strip uknown is the devil, rather than alternatives
