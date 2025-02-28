---
layout: layouts/blog.njk
title: Intro to Snap! Procedural Music Creation Curriculum
tags:
  - education
  - music
  - Snap!
  - Startr
date: 2025-02-21T17:46:00.000Z
rating: 5
summary: Unlock your creativity with the Snap! Procedural Music Creation
  curriculum. Learn to make music by coding with Snap! as your tool. Start with
  simple sounds and build up to creating complex generative music. You'll be
  amazed at what you can do - coding a program that can even compose a whole
  album for you!
---
## Introduction

Get ready to create music like never before with the Snap! Procedural Music Creation Curriculum. This hands-on course teaches you to make music by coding with Snap!, a visual programming language as your instrument. You'll start with simple sounds and build up to creating complex, unique music. By the end of the course, you'll be able to code a program that can compose entire songs or even a whole album.

This approach to composing music is also called _algorithmic composition_ or _generative music_. It's music created using rules and randomness, rather than writing every note by hand. It involves using predefined instructions, mathematical models, or random chance to produce sequences of notes, rhythms, and harmonies. The result can range from simple melodies to complex, ever-changing soundscapes. This approach makes each performance one-of-a-kind. Many famous musicians, like John Cage and Brian Eno, have used generative techniques to spark their creativity. In fact, Brian Eno wanted his album _Music for Airports_ to be "made endless" [(GenerativeMusic.com | Apps by Brian Eno and Peter Chilvers)](https://www.generativemusic.com/#:~:text=Air%20is%20like%20%27Music%20for,always%20wanted%20it%20to%20be) – generative music makes that possible. Even movie soundtracks use these ideas: the official _Inception_ app merged the listener’s surroundings with ambient music and Hans Zimmer’s score to create a dreamy, ever-changing soundscape [(Inception App Augments Your Reality, Acoustically | WIRED)](https://www.wired.com/2010/12/inception-app/#:~:text=The%20app%20uses%20just%20about,life%20memories). 

Video games brought procedural music generation to a wide audience by making it a core part of interactive experiences. Unlike a film, where the soundtrack is fixed to the edited scenes, a game is nonlinear – the player’s actions can change the pace or environment, so the music often needs to respond dynamically. This created a need for _adaptive music_ systems that could change or generate music based on gameplay. **Untitled Goose Game** (2019) uses a clever interactive score based on Claude Debussy’s piano Preludes: the game engine plays different prerecorded piano phrases depending on the goose’s sneaky or chaotic behavior [(Playing Your Song: The Evolution of Dynamic Music in Games - EGM)](https://egmnow.com/playing-your-song-the-evolution-of-dynamic-music-in-games/#:~:text=frenetic%20soundtrack%20that%20perfectly%20underscores,they%20harass%20the%20local%20villagers), resulting in a soundtrack that feels like a live accompanist improvising along with the slapstick action.

These examples show how coding, music, and creativity can blend in exciting ways. Now it's your turn to explore, learn and create!

## Acknowledgements ##

Before jumping into our lessons, we want to thank **Brian Harvey** and **Jens Möenig** for creating Snap!, a block-based programming language. Snap! makes advanced computer science concepts easy to understand, even for non-programmers. With support from the National Science Foundation, Jens and Brian developed Snap! to be user-friendly. Today, over 1,000 high school and college computer science teachers use Snap! in their classes. Many others use it for fun and personal growth.

We've created our own variation of Snap!, called **Startr Snap!**. It has some unique features and our own custom libraries. This variation is designed to make coding even more accessible and fun for robotics and AI integration. 

We also appreciate the **TuneScope** music library in Snap!, which lets users create different types of music. The University of Virginia's School of Education, Department of Computer Science, and Department of Music worked together to develop TuneScope. In fact, the University of Virginia offers a companion course as an elective in its Bachelor of Arts in Computer Science program. The goal is to help people express their creativity and explore the arts through coding. 

## Course Outline

Each lesson builds on the previous one. Work through them in order, and by the end you'll be coding music like a pro!

1. **Lesson 0: Introduction to Snap! Programming** - Orient yourself with the Snap! programming platform.
2. **Lesson 1: Snap! Sound Basics** – Play notes and make simple tunes using Snap!’s sound blocks.
3. **Lesson 2: Coding a Simple Snap! Melody** – Use loops and sequences to create your first coded melody.
4. **Lesson 3: Coding Rhythm and Beats in Snap!** – Learn to program timing and rhythm patterns in your music.
5. **Lesson 4: Introduction to TuneScope** – Transition to TuneScope for richer instruments and sounds.
6. **Lesson 5: Adding Randomness to Music** – Introduce random variations to make music unpredictable and fun.
7. **Lesson 6: Algorithmic Melody Patterns** – Generate melodies with simple algorithms and patterns.
8. **Lesson 7: Advanced Melody Generation with TuneScope** – Create more complex tunes with TuneScope’s features.
9. **Lesson 8: Rhythm and Harmony in TuneScope** – Combine drums, chords, and concurrent sounds for depth.
10. **Lesson 9: Structuring Your Composition** – Organize your music into sections (intro, chorus, etc.) and balance structure with randomness.
11. **Lesson 10: Final Project – Generative Music Album** – Build a full generative soundtrack or album using everything you've learned.



## Lesson 0: Introduction to Snap! Programming

**Objective:** Welcome to Snap! In this lesson, we'll show you how to use the Startr Snap! platform and get started with block-based programming. Don't worry if you're new to programming - we'll take it one step at a time.

**Activities:**

1. 1. **Create a Startr Snap! Account** : Go to [Startr Snap!]([https://snap.startr.cloud](https://snap.startr.cloud/)) and sign up for an account. It's easy:
    - Click the **Join** button in the top right corner.
    - Fill in the required information to create your account.
    - If you already have an account, click the **Login** button instead.
    - Not ready to create an account? You can still start coding by clicking the **Run Snap!** button in the top left corner. Keep in mind that your work won't be saved online, but you can always save it to your computer.
	
2. **Explore the Startr Snap! Workspace**: Snap! is a block-based programming language, which means you build scripts by dragging and snapping blocks together. Let's dive in and see how it works!
	- **Drag a Block**: Grab the **`Move 10 Steps`** block from the **Code Block Palette** on the left-hand side of the screen and drag it to the **Script Area** in the middle of the screen. 
	- **Add Another Block**: Choose another block, like the **`turn clockwise 15 degrees`** block, and snap it  to the first block. Now you have a script!
	-  **Run Your Script** : Click the group of blocks to make the script happen. Look at the **Stage** (top right corner of your screen) and you'll see the arrow move and turn. Click the script again to make it repeat.  

3. **Discover the Snap! Menus:** In the top left corner of the Snap! screen, you'll find several menus that can help you navigate and customize your experience. Let's explore them: 
	-  **Start.Snap! Icon** : Click the Start.Snap! icon to access the Snap! reference manual, the Berkeley Snap website, and the Github source code. These resources are perfect for learning more about Snap! and its community.
	-  **File Menu** : Click the File icon to find options like **Save** , **Open** , and **Libraries** . We'll be using these features later in our lessons. Take a look at the Libraries options and click on one to learn more about what it does. Don't import anything just yet - we'll do that later with **TuneScope**.
	- **Cloud Icon** : Use the Cloud icon to log into your account or create one if you haven't yet. Having an account allows you to save your work online and access it from anywhere.
	- **Gear Icon (Settings)** : Click the Gear icon to access a range of settings and options. You can change the language, make the blocks larger for easier reading, and more. While you're here, make sure to enable **JavaScript Extensions** . This is necessary for adding musical features and functionalities to your projects. 

4. **Explore the Snap! icon:** On the top-right side of the screen, you'll find a set of useful icons to help you navigate and control your Snap! experience. Let's explore them: 
	-  **Footsteps Icon** : Click the Footsteps icon to turn it green. With a code script, each block will be highlighted as it's played. Try it out with your code blocks from earlier.
	- **Speed Control** : Notice the toggle to the right of the Footsteps icon. This allows you to adjust the speed of your script. Move it to the left to slow down or to the right to speed up.
	- **Stage Size Icons** : Click the grey rectangle within a white rectangle icon to change the stage size. The icon with diagonal arrows beside it also controls the stage size. Experiment with these icons to see how they work.
	- **Script Control Buttons** : The next three buttons - the green flag, yellow pause button, and red stop sign - control your code scripts. However, they won't work yet because we need to add a **`when (green flag) clicked`** block to our script. Let's do that:
	    - Go to the Code Block Palette and select the gold-colored **Control** tab.
	    - Drag the **`when (green flag) clicked`** block and snap it to the top of your code script.
	    - Click the **green flag icon** to see your code in action!
	-  **Saving and Opening Code** : Before we finish, let's practice saving and opening our code. This is an essential skill, especially when working with web versions of Snap! that don't autosave. We'll show you how to do this in the next steps.

**You're Ready to Roll!**
Congratulations! You've completed the introductory tour of Snap!. You now know where to find the main features and tools. It's time to put your new skills to the test and start creating something amazing. Let's dive into the world of music coding and explore the exciting possibilities of Snap!'s music sound blocks!


## Lesson 1: Snap! Sound Basics 
**Objective:** Explore Snap!’s sound blocks and create simple melodies. 
You will learn how to play notes and control their pitch. This is the first step toward making music with code.

**Activities:**

1. **Explore Sound Blocks:** Open Snap! and find the Sound tab in the the code block palette. Drag out the block that says **`play note (60) for (0.5) beats`**. (The numbers might be different in your version; 60 usually means middle C in musical terms, also called C4.) Click the block to hear the note play. If you select the down arrow next to the number in the block, you will see a piano keyboard and the note you are playing.
	- Try changing the note by changing the number or by using the piano. 
	- Do you hear how the pitch goes up or down when you change the number? 
	- That number represents the note’s frequency or pitch. Smaller numbers make lower notes, and larger numbers make higher notes in a scale. For example, duplicate the block several times. 
	- Right-click and “duplicate” or drag new blocks from the Sound category. 
	- Set the notes to 60, 62, 64, 65, 67 (which will sound like a simple 5 note scale). 
	- Click the stack to play the notes in sequence. 
	- Congratulations! You just coded a little tune, a scale :)

2. **Experiment with Tempo:** Find the block **`set tempo to (60) bpm`** . BMP means beats per minute and in music it's a way to indicate the tempo, or speed, of a piece of music. Try setting the tempo higher (e.g. 120 bpm) or lower (e.g. 30 bpm) and play your note sequence again. Notice how the speed changes. You can also make the tempo change mid-song by inserting another tempo block in between notes. 

3. **Experiment with Instruments:** Snap! has an instrument setting, there’s a block  **`set instrument to (1)`** for simple waves. Try it out by changing the instrument number and play your notes to hear different sounds (sine, square, saw-tooth and  triangle). Snap!’s basic sound blocks don't have advanced instruments by default only old school sounds. Bon’t worry – we will get more instruments when we move to TuneScope later. For now, just explore the default sounds.

Take a moment to reflect on what you did. You used code blocks to play musical notes in order. This is how composers think – except you’re giving instructions to the computer. **By mastering these basics, you're on your way to coding real songs.** Feel free to play around more: make the note sequence longer, or adjust how long individual note blocks are playing for ( this can be done by adjusting the "for _ beats" section of the note block.). Have fun playing around with it!

## Lesson 2: Coding a Simple Snap! Melody

**Objective:** Learn to use loops and sequences to create melodies. 
In this lesson, you will compose a simple melody by coding a sequence of notes and using loops to repeat patterns. This will show you how code can save you time (no need to drag 100 blocks for 100 notes if you can loop a shorter pattern!)

**Activities:**

1. **Compose a Short Tune:** Think of a very simple melody (for example, the first line of “Twinkle Twinkle Little Star” or a few notes from a favorite song). Using what you learned in Lesson 1, arrange a sequence of **`play note`** blocks to play that melody. Don’t worry if it’s not perfect or very long. Even 4-8 notes are fine. Play it to test how it sounds. Adjust the note numbers if need to get the tune right.
	-  Here are three short melody sequences. If you use, them try to recognize what songs they are from.
		- 60, 60, 67 , 67 ,69 ,69, 67, 67
		- 64, 62, 60, 62, 64, 64, 64, 64
		- 63, 59, 66, 59, 63, 59, 66, 59

2. **Use a Loop for Repetition:** Most songs have repeating parts. Instead of duplicating the same blocks over and over, use a loop. Snap! has a **`repeat (10) { ... }`** block or a **`forever { ... }`** block (It also has the **`for each`** but we'll learn about that in a later chapter). 
	- Select a few notes from your melody (2-4 notes will do).
	- Place those note blocks inside a **`repeat`** block. 
	- Set the repeat count to, say, 4. 
	- Now click the loop to hear the motif repeat 4 times. You just saved effort by looping! 
	- Try increasing the repeat count or change how many notes are being repeated. If you want, you can also change the notes. Listen to what sounds best to you!

3. **Create an A-B-A Melody Structure:** A common song structure is A-B-A (sometimes called verse, chorus, verse). Let’s simulate that simply. Let "A" be the melody motif you just looped. 
	- Let's create a different short melody motif for your "B" (chose maybe 4 more notes) as another sequence of blocks. If you want, you can also loop your melody B like you did with your melody A. 
	- Now, let's play your A-B-A melody. For now, we will do it manually: 
		- Play your A looped melody once
		- Then play the B melody (your new sequence) once
		- And then play A again.
	- This A-B-A gives a simple structure to your music. Later, we’ll learn how to automate the structure, but give yourself a high-five for manually creating a structured A-B-A melody with code!

**The end of Lesson 2,** you have coded an actual melody. You also learned how loops can make coding music easier and more efficient. **This skill will be crucial** as you build longer pieces without writing a million separate blocks. Feel free to experiment: try making the melody longer, or add a **`wait ( ) secs`**  or a **`rest for ( ) beats`** block between notes to create pauses (rests). The more you play around, the more comfortable you'll get. Keep your favorite melody code – you might reuse parts of it in a later project!

## Lesson 3: Coding Rhythm and Beats in Snap!

**Objective:** Add rhythm and beats to your music. 
In this lesson, you will learn how to control timing and create rhythmic patterns. Music isn’t just about which notes you play – it’s also _when_ you play them and for how long. You’ll practice changing rhythms, add some rests, and even add some basic drum beats to your melody.

**Activities:**

1. **Understand Beat Duration:** In Snap!, the **`play note ( ) for ( ) beats`** block uses “beats” as a unit of time. Usually, 1 beat is equal to a quarter note. Let's use your melody A and re-listen to it. 
	- Now, try changing all your beats to 0.5 (eighth note) and listen to how it sounds different. Does it sound faster or slower? 
	- Try changing the beats to 2 (half note) and notice how this changes your melody. 
	- You can also change your beats to other numbers.

2. **Make a Simple Drum Beat:** Snap! has an "old school" 80s synth drum sound instrument. You can use it by running **`(instrument 3)`** block.  With this, you can imitate a drum by using a very low-pitched note for a bass drum and a high short note for a snare. 
	- Create a new script stack for your rhythm: First take out a tempo block and an instrument block. 
	- Set the tempo block to 90 bpm and the instrument to 3 (sawtooth). You can also try the square (instrument 2) too.
	- Next, take out two play blocks. 
		- For a basic “boom-chak” drum pattern beat, you can set the first to **`play note 28 for 0.5 beats`** (this is our base drum sound).
		- And the second to **`play note 50 for 0.5 beats`** (as a snare sound). 
	- Put these two play blocks together inside a **`forever { }`** loop to repeat it many times. When you run it, it should alternate low and high sounds in a steady rhythm. 
	- You can adjust the tempo to a comfortable speed, like 90 or 120 bpm, and listen. You’ve made a basic rock beat!
	- As a challenge, you can try and make a more complex beat that lasts twice as long. You might want to check out the **`rest for ( ) beats`** block to add pauses between your drum sounds.

3. **Sync Melody with Rhythm:** If you are brave feel free to try and play both your A-B-A tune and rhythm at the same time. Using the sound blocks this way might get out of sync. With the basic sound blocks, even if you have your beats synced, it's easy for there to be drifts in timing. That's why in the next chapter we introduce TuneScope. 

4. **Experiment with Rhythm Patterns:** Try changing the rhythm pattern. Instead of a constant loop, maybe do two beats of bass drum, then one beat rest, then one snare – get creative. Also experiment with **rests**: Snap! has a **`rest for ( ) beats`** block. Use rests to create short pauses in your rhythm. For example, try looping the following:
	- **`play note 28 for 1 beats`**
	- **`rest for 0.5`**
	- **`play note 28 for 0.5 beats`**
	- **`note 50 for 1 beats`**
	- **`note 50 for 1 beats`**

5. Listen! You are coding your own drum machine!

Rhythm is what makes music catchy and gives it structure. **After Lesson 3,** you now know how to control timing in your code. You can make the same melody feel different just by changing the rhythm. This will be useful when you design your own compositions – you might use the same generative melody but vary the rhythm to keep things interesting. Great job adding another layer to your musical coding skills!

## Lesson 4: Introduction to TuneScope

TuneScope is a library for Snap! that greatly expands our music capabilities. It provides more instrument sounds (like piano, guitars, and drums) and advanced blocks for music creation [(PDF TUNESCOPE - Snap!))](https://snap.berkeley.edu/static/doc/TuneScope%20Book.pdf#:~:text=TuneScope%20extends%20the%20music%20creation,Eric%20Stein). In this lesson, you’ll transition from using the basic Snap! sound blocks to using TuneScope's block library, preparing you to create richer-sounding generative music.

**Activities:**

1. **Setup TuneScope:** First, you need to access TuneScope. TuneScope is available as a library in [Startr Snap)](https://snap.startr.cloud/snap). 
	- Click on the file menu icon and then Libraries. 
	- Now you can find and select the TuneScope library. 
	- Once it's selected click Import. 
	- Once loaded, you will see new blocks and the Music blocks category in addition to the standard Sound blocks.
	- In the Music tab, find the Initialize TuneScope block and click it to start up TuneScope. (Even though you have imported the TuneScope library, it still needs to be loaded, which takes a few seconds). 

	1. ![[Screenshot 2025-02-16 at 2.34.32 PM.png]]

2. **Explore New Instruments:** TuneScope extends Snap! with sampled instruments [(PDF TUNESCOPE - Snap!)](https://snap.berkeley.edu/static/doc/TuneScope%20Book.pdf#:~:text=TuneScope%20extends%20the%20music%20creation,Eric%20Stein). This means you can now have more realistic sounds. 
	- Now that TuneScope has been initialized,  look for the block  **`set instrument to "piano"`** 
	- Notice that the drop down arrow beside "piano" reveals different instrument families: Brass, Strings, Woodwinds, Drums, Other. Also notice that each family also has a drop down arrow that reveals various instruments. 
	- For now, let's start with the piano instrument. 
	- Find the **`Play note for Duration  and wait`** block. 
	- Select a C note for a quarter note duration, and listen to how it sounds compared to Snap!’s default note sound. 
	- Do the same for a guitar or another instrument. Enjoy testing a few instruments – you're exploring your sound palette for your upcoming compositions.

3. **Play a Simple Scale in TuneScope:** Let's first recreate a simple 5 note scale from Lesson 1, using TuneScope blocks. You may need to adjust to the slightly different syntax in TuneScope. For instance, instead of using numbers for each note of the scale (60, 62, 64, 65), TuneScope uses note letters and numbers (C4, D4, E4, F4, G4). In Snap Sounds, if you clicked on the keyboard, you might recognizes these note letters and numbers. If not, don't worry. The letters refer to the musical notes and the number refers to what octave of the instrument you are playing (so a C3 will sound an octave lower than the C4, and the C5 will sound an octave higher).
	- Grab another 4 **`Play note for Duration  and wait`** block (or duplicate)
	- For each block, enter one of the following notes: D4, E4, F4, G4
	- For each block set the duration to quarter note. 
	- Play your simple scale by pressing on the script. 
	- If you want to change the speed of your scale, you can either change what duration your notes are played at. For faster notes, you can select eight notes or sixteenth notes. Alternatively, you can change the tempo by adding a  tempo block from Snap's Sound tab. To do this, drag a **`set tempo to. bpm`** block and snap it at the top of your script. Have fun experimenting with instruments, notes, rhythms, and tempo!
	- #todo add proper image!
	![[Pasted image 20250220114524.png]]
4. **Compare TuneScope with Snap! Basic Sound:** Let's list off some of the noticeable differences using TuneScope: 
	- The instruments sound more realistic. That's because they are sampled from real instruments instead of synthesized. 
	- The notes use letters that relate to musical notation, rather than midi numbers.
	- The rhythms use musical terms, but numbers of beats also work. 

5. **Play a Tune in TuneScope:** Let's now try recreating your simple melody from Lesson 2, using TuneScope blocks. If you prefer to create a new melody, that's ok too. 
	- Let's grab a  **`set instrument to `** block and a few **`Play note for Duration  and wait`** blocks.
	- The simple melody we used in Chapter 2 was Twinkle Twinkle Little Star. The Snap Sound blocks we used was: 60, 60, 67 , 67 ,69 , 69, 67, 67 (with each 1 beat long). 
	- Because TuneScope uses musical notation, the melody would be: C4, C4, G4, G4, A4, A4, G4, G4 and the duration would be a quarter note for each note. 
	- Now, let's have fun and grab a replete block from the Control tab and remix our melody with some loops. 
	- If you want, change up the instrumentation, notes, rhythms, or other musical things (there's a Rest block and Chord block you might want to try out). If you're adventurous, try composing an A-B-A melody and add some percussive rhythmic beats too! 

After Lesson 4, you have successfully moved into a more powerful music coding tool. **This sets the stage** for creating richer compositions. It might feel like starting over a bit because of new blocks, but all the concepts you learned still apply. You’ll now combine your knowledge of melody, rhythm, and algorithms with TuneScope’s features. The real fun – making complex generative music – is about to begin!
