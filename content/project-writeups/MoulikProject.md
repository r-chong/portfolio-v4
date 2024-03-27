# My Science Fair Experience

## Introduction

Over the course of this year, I’ve had the opportunity to participate in the [Waterloo-Wellington Science and Engineering Fair (WWSEF)](https://wwsef.ca/) and the [Canada Wide Science Fair (CWSF)](https://youthscience.ca/science-fairs/cwsf/edmonton-2023/). I’ve had a lot of fun working on my project and learned a lot along the way. I’m writing this blog post to share some of my experiences and details about my project to help others interested in participating in a science fair.

## Contents

- [Background](https://moulikbudhiraja.com/blogs/my-science-fair-experience#background)
- [The Project](https://moulikbudhiraja.com/blogs/my-science-fair-experience#the-project)
    - [Rocky Beginnings](https://moulikbudhiraja.com/blogs/my-science-fair-experience#rocky-beginnings)
    - [Project Development](https://moulikbudhiraja.com/blogs/my-science-fair-experience#project-development)
    - [Training Program & Testing](https://moulikbudhiraja.com/blogs/my-science-fair-experience#training-program-&-testing)
- [Regionals](https://moulikbudhiraja.com/blogs/my-science-fair-experience#regionals)
- [CWSF](https://moulikbudhiraja.com/blogs/my-science-fair-experience#cwsf)
- [Final Thoughts](https://moulikbudhiraja.com/blogs/my-science-fair-experience#final-thoughts)

## Background

I want to talk about some of the technical skills I had before starting this project and why I did the project in the first place. This all took place during my grade 12 year of high school, I had learned to code a few years prior in Python, and that’s the language I would use to make most of my projects. This year, I challenged myself and learned a few new languages, namely C++ and Typescript. My approach to understanding these languages was to try using them in a project and learn as I go.

This was also the year I had the opportunity to run the Computer Science Club at my school with a few friends. I had been a member of the club the year and honestly just wanted to have it as a leadership experience I could put on university applications. During one of the early club meetings, I was showing the members some of my past projects as inspiration and **definitely* wasn’t bragging*. This was the day I formally met my partner for this project, Katelyn Wu

Later that week, Katelyn approached me while walking home from the bus stop and asked if I would like to work on a project with her for WWSEF. Her idea was to create a speech-to-braille device that would allow people with visual impairments to learn braille by reciting characters with their voices and feeling the corresponding braille character on their fingers. Generally, I’m very skeptical and often don’t believe in many project ideas - including my own - and this was no different. I was reluctant to work on this project at first, but after Katelyn told me I wouldn’t have to worry about any of the written reports or the poster board, I eventually agreed to work on the project with her. The possibility of winning a $1000 scholarship was also pretty enticing.

## The Project

The project, as of now, is a braille learning device that allows users to learn braille through cognitive load theory. The device features two motors that spin octagons with specific braille patterns on each side. The training program randomly selects a character from the alphabet, presents it on the device and prompts the user to say the character. The device will move on to a new character if the user says the correct character. If the user says the wrong character, the device will let the user try again. The device keeps track of the user’s accuracy when identifying characters and will present characters with lower accuracies more often.

While the device now is quite capable, it wasn’t always this way, and you can see how it’s a lot different than the original idea I described above.

### Rocky Beginnings

Before I started working on this project, Katelyn already had a few early prototypes of the device. Although, each of the existing prototypes had at least one major flaw. The first prototype used led lights to represent the braille characters. This obviously was a problem because of the need for tactile feedback. The second prototype solved this issue by using servo motors instead of the lights; while the device now had tactile feedback, it was far too big to be used practically.

To solve these issues, I designed a new device version with 6 very small DC motors, one to drive each braille pin. This design had its own problems, as these motors didn’t have the torque to counteract a human’s finger pressing down on them. The motors were still too big to meet braille specifications, and this idea was also scrapped.

This was when I came up with the much simpler idea of using two stepper motors to spin octagons with braille patterns on each side. This design was much more compact and wouldn’t face the previous torque issue. It was also much easier to implement as it only required the two motors, their drivers and a few 3D-printed parts.

### Project Development

The development process from there wasn’t too interesting. Most of the physical device was made over a single weekend, and I wrote almost all of the code over March break. I did go back right before CWSF to create a new version of the device with cleaner wiring.

### Training Program & Testing

The training program is another thing that ended up being very different from the original idea. As mentioned before, the original idea was to have the user recite characters and feel the corresponding braille character on their fingers. What I ended up making was more of a game that would present a character on the device and prompt the user to say the character. We found that this approach was much more effective at teaching braille than the original idea. The training program was written in Typescript using the React framework and was also something that I did over the March break.

Our approach to testing was to have a few of our friends blindfolded and split into two groups. One group would use the device, and the other would use a traditional braille learning kit. We would give people from each group 10 minutes to learn using their respective tools. After the 10 minutes, we would test each person’s ability to identify braille characters.

For our first round of testing, we got very discouraging results, with most people learning better with the traditional method. We later realized that this was because our training program would randomly select a letter from the entire alphabet, and most people cannot learn 26 unique characters at once. To solve this issue, we made the program only select from a subset of the alphabet and slowly grow the subset as the user gets better at identifying characters. This approach was much more effective, and we saw much better results in our second round of testing, with our device now doubling the learning rate of the traditional method.

## Regionals

This year WWSEF was during the second week of April, and I got to miss a calculus test to attend. WWSEF was my second time participating in a science fair, the first time being in grade 6 when I achieved dead last. It was a very enjoyable day, and I got to see a lot of very cool projects, but it was also a very long day. I remember having to wake up at 5:30 in the morning to get to the science fair by 7:00. We set up our project and then almost failed the safety inspection because our project board was too wide.

All projects were judged in the morning, and each would be judged a minimum of 4 times. For our presentation, we chose not to go by a script and instead improv the entire thing.

The rest of the day was filled with various activities, like touring Laurier and sitting through a presentation about quantum computing given by the Perimeter Institute.

The day concluded with the open house, where we got to show off our project to people from the public and also when we could walk around and look at the other projects at the fair. Soon after the open house was the awards ceremony, where much to our surprise, we won not only a gold medal but also the best in-division award for engineering and the award of merit, taking us to CWSF.

## CWSF

CWSF was a once-in-a-lifetime experience. It was a week’s trip filled with fun activities, meeting new people, and me losing my voice. Judging at Canada Wide was split into 2 days; the first day was for medals, and the second was for special awards. Everyone was guaranteed to be judged four times on the first day for 20 minutes each. On the second day, judges would come by your project to see if you qualified for any special awards you self-nominated for. We ended up qualifying for all 3 of the special awards we self-nominated for and had 14 judges come up to us that day.

The rest of the week was primarily open house and activities in the afternoon. The WWSEF team was nine people, including Katelyn and I, and we had a lot of fun as a group playing cards and watching movies in our free time.

The awards ceremony was the second last full day of the trip, and we weren’t expecting to win anything. Still, we had our hopes up for the Engineering special award, which we thought we were the most qualified for. After finding out that we didn’t win that, we didn’t expect to win anything else. We also didn’t win the second award we self-nominated for, related to computer science. At this point, we essentially accepted that we didn’t win anything as the final special award we nominated ourselves for was the S.M. Blair Family Foundation Award - given to the project that is most suitable to be patented, and our project was open source… When they called us up for that award, it’s safe to say that we were in disbelief. Not only did we win that award, but we also won 4 others with the full list of awards below:

- S.M. Blair Family Foundation Award
- Award of Excellence: Gold Medal
- Digital Technology Challenge Award
- Youth Can Innovate Grand Award
- Platinum Award - Best in Innovation | Senior

While I haven’t talked much about the work Katelyn did for the project, it was definitely a team effort and this isn’t something I could have done on my own. Especially when it came to presentation material and the presentation itself. The CWSF judges ask some very deep questions that I could not have answered myself.

## Final Thoughts

Overall, this was a very fun project to work on, and I learned a lot from it. The science fair experience was definitely the best part, and I would encourage everyone to take a shot at it. I would definitely do it all again if I could, even without the awards. The best part was definitely the people I met along the way and the friends I made.