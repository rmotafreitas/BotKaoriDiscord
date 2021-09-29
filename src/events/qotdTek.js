const { client } = require("../index");
const qotds = require("../json/pfp_states.json").states;
const question = require("../models/qotd");
const cron = require("node-cron");
const { MessageEmbed } = require("discord.js");

client.on("ready", async () => {
  let data = await question.findOne({
    id: 0,
  });
  var n = data ? data.n : 0;
  if (!data) {
    const newQ = new question({
      n: 1,
      i: 0,
    });
    newQ.save().catch((err) => console.log(err));
  } else {
    data.n += 1;
    data.save().catch((err) => console.log(err));
  }
  const questions = [
    "What have you created that you are most proud of?",
    "What's the best thing you got from one of your parents?",
    "What bends your mind every time you think about it?",
    "In your group of friends, what role do you play?",
    "What incredibly strong opinion do you have that is completely unimportant in the grand scheme of things?",
    "What's your favorite piece of clothing you own?",
    "What fictional place would you most like to go to?",
    "What's one place you've travelled that you never want to go back to?",
    "When people come to you for help, what do they usually want help with?",
    "What are you interested in that most people haven't heard of?",
    "Mountains or ocean?",
    "What was your best birthday?",
    "Pizza or tacos?",
    "What's the story behind one of your scars?",
    "Pancakes or waffles?",
    "Pirates or ninjas?",
    "What was the best compliment you've ever received?",
    "If you lost all of your possessions but one, what would you want it to be?",
    "Who inspires you to be better?",
    "What dumb accomplishment are you most proud of?",
    "When was the last time you changed your opinion about something major?",
    "What is something you can never seem to finish?",
    "What is one of your favorite smells?",
    "If you had to change your name, what would you change it to?",
    "What are you a natural at?",
    "What do you like most about your family?",
    "Have you ever saved someone's life?",
    "What's an unpopular opinion you have?",
    "Who is one of your best friends, and what do you love about them?",
    "Do you have any nicknames?",
    "What's one of your favorite comfort foods?",
    "What is your theme song?",
    "What is one of the great values that guides your life?",
    "What's your favorite book?",
    "What's the last book you gave up on and stopped reading?",
    "What's the worst movie you've ever seen?",
    "What issue will you always speak your mind about?",
    "What would you do on a free afternoon in the middle of the week?",
    "Pet peeves?",
    "What's the best piece of advice you ever received?",
    "Who was your favorite teacher and why?",
    "If you could have any superpower, what would it be and why?",
    "What's on your bucket list this year?",
    "If you could live in a book, TV show, or movie, what would it be?",
    "What languages do you speak?",
    "Would you rather be stuck on a broken ski lift or a broken elevator?",
    "If you were a vegetable, what vegetable would you be?",
    "What makes you cry?",
    "Who are some of your heroes?",
    "What's something you wish you'd figured out sooner?",
    "What's your favorite candy?",
    "What's your worst habit?",
    "Favorite city?",
    "What's your go-to dance move?",
    "Do you ever sing when you're alone? What songs?",
    "What's your earliest memory?",
    "What's something you learned in the last week?",
    "What story does your family always tell about you?",
    "What talent would you show off in a talent show?",
  ];
  const qotdChannel = client.channels.cache.get("807300492463833209");
  const question = "1 0 * * *";
  cron.schedule(
    question,
    () => {
      const embed = new MessageEmbed()
        .setTitle("❓❔ Question of the Day ❔❓")
        .setColor("BLUE")
        .setFooter("Asked by Kaori")
        .setDescription(questions[n])
        .setTimestamp();
      qotdChannel.send();
    },
    {
      scheduled: true,
      timezone: "Europe/Lisbon",
    }
  );
});
