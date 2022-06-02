This is a simple API to receive an email value and return a JSON with the following properties:

{
raw_email: string,
cleansed_email: string,
domain: string,
validation_timestamp: string,
domain_valid_indicator: string,
username_valid_indicator: string,
validation_result: string
}

Thought process:

When I think of matching patterns I usually think of regex, so that's what I ended up using throughout the whole API. Took me about 2h to code it and then another 30-40 min writing the comments explaining what each function does, the rest of the time was spent checking if any adjustments were needed and testing.
My solution and intent is better explained in the actual code with comments, I did it there because I thought it would be easier to visualize and show examples.

The hardest part for me was getting all those regexes to work, I like using them but their syntax is a pain to remember, there were some problems at the beginning because I forgot to add the g for global in them and ended up only removing the first match in the substitutions.

Technologies used:
Typescript - I like using it and I think it is a really powerfull tool to help when writing code;
Node and Express - for the communication and the actual routing of the API.

To run:
1 - run "npm install" to install all dependencies;
2 - run "npm build" to build and compile the code;
3 - run "npm run dev" to actually run the API.

To use it you have to make a request to your local api ("http://localhost:3333") with a body containing a JSON with the following properties:
{
"email": string
}
