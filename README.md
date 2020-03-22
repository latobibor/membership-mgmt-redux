# Access level manager by András Dániel Tóth

## How to try it
**Prerequisite**: you will need to have [https://nodejs.org](node.js) installed on your machine.

### Step by step
1. Find an empty folder and then `git clone https://github.com/latobibor/membership-mgmt.git`
1. In the folder run `npm i` to install the dependencies required
1. Run `npm start` to start the application (it should open a browser tab)

### Troubleshooting
There should be no running app that holds onto port 3000.

## Things to note about the task
Given the short term and the lack of time, I had to cut several corners and make some assumptions. Here is the list of them :).

### Choices made
I have used `TypeScript` along with `React` since this is the programming language I'm the most familiar with right now. `TypeScript` has actually a productivity benefit over regular "vanilla" JS, since (handled well) it is warning me about stuff I would have discovered in runtime.

The other choice was not using `redux` but using latest `React` API to get similar results (the chosen solution still used dispatch functions
and a global state, since this task really needed those).

Another thing where I needed to cut some corners that I did not have time critically refactor my own work; the code grew "organically" when I realized I can finish one more and one more tiny feature. So this means that there might be components which do too much or responsibilities that should have been in another component. Sorry about that.

Lastly I have used `Bootstrap 4` as I'm familiar with that and it is excellent for tasteful prototyping. I have used the simplest option which was adding the _entire_ CSS bundle to the app, but _without_ the JS parts (it would have depended on `jQuery` - that puzzled me in 2020 :)).

For handling `API` requests I tried to fake `fetch` API as close as possible, so the mock functions return `Promise`s; just like in real life.

### How to verify the mock API calls
Open the console of the browser; the mock requests will be visible in the output window.

### Missing features
So here's a list of what needs to be done and what I think about doing them.

#### Tests
I was rushing the feature work and my understanding of the task at hand was creating a prototype that users and relevant stakeholders can interact with. Therefore testing is not so relevant - the entire UI might be reworked after the first interactions. 

To see my tests at work I recommend checking [https://github.com/latobibor/esys-homework/tree/master/src](another take home) test I did recently.

#### Mobile version
The app was not tested in small size unfortunately.

#### Add new member
If I had the time I would have asked how the "New Member" button would work since in the memo there is only a list of members result listed 
and a list of changes which need references to existing members (`person_id`). Therefore I would have liked to know what is the accepted payload for adding new members.

My solution would have been to use an existing `React` modal `npm` package as opposed to the bootstrap one (see `jQuery` dependency). The layout itself is fairly straightforward with Bootstrap 4.

This feature would have been also dependent on a **missing API endpoint**: in the brief I did not see any example return value for saving a user.

#### Filter users with `is_user` === `false`
Probably a very quick task but I would have asked about the goal of the feature. Why do we download users if we don't want to do anything with them? Or do we want to revoke access to the application through this same UI? (Then a checkbox would have been needed).

#### Error handling
I would have added at least a notification over API calls that did not succeed.

### Known issues
#### Access Level does not refresh when a role was selected
Let's say you have selected Access Level and decided to change the role of the user. The `Select` component from `react-select` could not handle
changing the default values _and_ updating the selected item in its `onChange` method. Therefore I did a little hack there so until the user
does not select a new Access Level for the new Role, the change will not be saved.

#### Save changes button should disappear if the last changed item is closed without saving

### The taxonomy of parts in the app might not be consistent
I tried to be consistent with wow I call the different components and responsibilities throughout the application, but given this short time I was concentrating more on writing cleanish code with working features.
