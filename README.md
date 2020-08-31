# Blog-Away-With-Donations
This project is a starting point for a TypeScript based React app that also has a local API server using express.

There are 2 different Webpack configurations. One for the server and one for the client.

<br />
<br />
<br />
<br />

## Configurations
### ***Database***
Make sure you create all tables using schema name 'Blogs'
<br />
<br />
#### ***Privileges***
create user 'Blog_DB'@'localhost' identified by '(your password)';<br />
grant all privileges on Blogs.* to 'Blog_DB'@'localhost';
<br />
<br />
<br />
<br />

## DDLs

#### ***Accesstokens Table***
CREATE TABLE `Accesstokens` ( <br />
  `id` int(11) NOT NULL AUTO_INCREMENT, <br />
  `userid` int(11) NOT NULL, <br />
  `token` text, <br />
  `expires` datetime DEFAULT NULL, <br />
  `_created` datetime DEFAULT CURRENT_TIMESTAMP, <br />
  PRIMARY KEY (`id`), <br />
  KEY `userid` (`userid`), <br />
  CONSTRAINT `accesstokens_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) <br />
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1
<br />
<br />
#### ***Users Table***
CREATE TABLE `Users` ( <br />
  `id` int(11) NOT NULL AUTO_INCREMENT, <br />
  `email` varchar(255) NOT NULL, <br />
  `password` varchar(60) DEFAULT NULL, <br />
  `role` varchar(25) DEFAULT 'admin', <br />
  `_created` datetime DEFAULT CURRENT_TIMESTAMP, <br />
  PRIMARY KEY (`id`), <br />
  UNIQUE KEY `email_UNIQUE` (`email`) <br />
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1
 <br />
  <br />
#### ***Authors Table***

CREATE TABLE `Authors` ( <br />
  `id` int(11) NOT NULL AUTO_INCREMENT, <br />
  `name` varchar(50) NOT NULL DEFAULT ' ', <br />
  `email` varchar(100) NOT NULL DEFAULT ' ', <br />
  `_created` datetime DEFAULT CURRENT_TIMESTAMP, <br />
  PRIMARY KEY (`id`) <br />
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1; <br />

INSERT INTO `Blogs`.`Authors`
(`id`,
`name`,
`email`)
VALUES
(1, 'Billy Joe', 'billyj@gmail.com');

INSERT INTO `Blogs`.`Authors`
(`id`,
`name`,
`email`)
VALUES
(2, 'Rachel Smith', 'rachels@gmail.com');

INSERT INTO `Blogs`.`Authors`
(`id`,
`name`,
`email`)
VALUES
(3, 'Daniel Williams', 'danielw@gmail.com');

<br />
<br />

#### ***Blogs Table***

CREATE TABLE `Blogs` ( <br />
  `id` int(11) NOT NULL AUTO_INCREMENT, <br />
  `content` longtext, <br />
  `title` varchar(60) DEFAULT NULL, <br />
  `authorid` int(11) NOT NULL, <br />
  `img_src` text, <br />
  `_created` text NOT NULL, <br />
  PRIMARY KEY (`id`), <br />
  KEY `fk_blogauthors` (`authorid`), <br />
  CONSTRAINT `fk_blogauthors` FOREIGN KEY (`authorid`) REFERENCES `Authors` (`id`) <br />
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
<br />
<br />

#### ***Tags Table***

CREATE TABLE `Tags` ( <br />
  `id` int(11) NOT NULL AUTO_INCREMENT, <br />
  `name` varchar(50) NOT NULL DEFAULT ' ', <br />
  `_created` datetime DEFAULT CURRENT_TIMESTAMP, <br />
  PRIMARY KEY (`id`) <br />
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1; <br />

INSERT INTO `Blogs`.`Tags`
(`id`,
`name`)
VALUES
(1, 'Books');

INSERT INTO `Blogs`.`Tags`
(`id`,
`name`)
VALUES
(2, 'Covalence');

INSERT INTO `Blogs`.`Tags`
(`id`,
`name`)
VALUES
(3, 'Domestic');

INSERT INTO `Blogs`.`Tags`
(`id`,
`name`)
VALUES
(4, 'International');

INSERT INTO `Blogs`.`Tags`
(`id`,
`name`)
VALUES
(5, 'Legal');

INSERT INTO `Blogs`.`Tags`
(`id`,
`name`)
VALUES
(6, 'Other');

INSERT INTO `Blogs`.`Tags`
(`id`,
`name`)
VALUES
(7, 'Sports');

INSERT INTO `Blogs`.`Tags`
(`id`,
`name`)
VALUES
(8, 'TV');

<br />
<br />

#### ***BlogTags Table***

CREATE TABLE `BlogTags` ( <br />
  `blogid` int(11) NOT NULL, <br />
  `tagid` int(11) NOT NULL, <br />
  PRIMARY KEY (`blogid`,`tagid`), <br />
  KEY `fk_matchtags` (`tagid`), <br />
  CONSTRAINT `fk_matchblogs` FOREIGN KEY (`blogid`) REFERENCES `Blogs` (`id`), <br />
  CONSTRAINT `fk_matchtags` FOREIGN KEY (`tagid`) REFERENCES `Tags` (`id`) <br />
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


<br />
<br />
<br />
<br />


## Stored Procedures
#### ***spBlogToTagMatch***

DELIMITER // <br />
CREATE PROCEDURE spBlogToTagMatch(my_tagid int) <br />
BEGIN <br />
	DECLARE my_blogid int default 0; <br />
	SELECT id INTO my_blogid FROM Blogs.Blogs ORDER BY id DESC LIMIT 1; <br />
	INSERT INTO Blogs.BlogTags(blogid, tagid) VALUES (my_blogid, my_tagid); <br />
END // <br />
DELIMITER ; 
<br />
<br />

#### ***spBlogTags***

DELIMITER // <br />
CREATE PROCEDURE spBlogTags(blogid int) <br />
BEGIN <br />
	 SELECT t.id, t.name FROM Blogs.Tags t <br />
     JOIN Blogs.BlogTags bt on bt.tagid = t.id <br />
	 JOIN Blogs.Blogs b on bt.blogid = b.id <br />
     WHERE b.id = blogid; <br />
END // <br />
DELIMITER ;

<br />
<br />
<br />
<br />



## Test Data

It is important that all data entries are entered using the application.<br />
Data entered manually with mysql will result in errors.<br />
For the creating an account, once the page loads go to the 'login' tab and there will be a link that redirects<br />
you to a 'register' page and from there an account should be created.
Please add all data with 'Admin Management' nav-link.<br />
as for the blog author and tags feel free to pick tags and authors of your choosing!
#### ***Entry 1***
* **TITLE:** I’m not sure I’ll be Inter manager next season – Conte <br />
* **IMAGE URL:** https://images.daznservices.com/di/library/GOAL/60/be/antonio-conte-inter-europa-league-final_wja5r2u9bod19jwu4p8a2nzp.jpg <br />
* **CONTENT:** The former Juventus and Chelsea boss enjoyed an excellent debut season with the Nerazzurri, which saw them push the Turin giants in Serie A before finishing second, while they were also Europa League runners-up. Speaking after a 3-2 loss to Sevilla in the Europa League final on Friday , Conte suggested that it might have been his last game in charge of the club. “We're going to meet next week with the club and we'll decide about my future. I'm not sure that I'll be the Inter manager next season, we'll decide together,” he told Sky Sport Italia . “Inter will plan the future with or without me." Conte's future has been in doubt since the conclusion of the Serie A campaign earlier this month, after which he launched a scathing attack on the club's directors. “I don’t think the work of the players has been recognised and I don’t think my work has been recognised,” he said. “We all received very little protection from the club, absolutely zero. “I don’t like it when people jump on the bandwagon – they have to be there in the good times as well as the bad and here at Inter it wasn’t like that, I’m sorry to say. “We have to grow and improve in all areas, including off the field, and a big club should protect its players more.” After Friday's game in Cologne, Inter president Steven Zhang did little to ease fears over the future of the 51-year-old. “He and his staff, together with the players and all the other members of the club are doing a great job,” he told Sky Sport Italia . “Now the players and the staff will rest, because they deserve it, and then we will plan for the future. “We want to improve next season. The balance of this season is very positive. We are on a path that has allowed us to get to the final. “All of us, on and off the pitch, are doing a great job and are heading in the right direction. Winning or losing is part of football, but getting to the final makes us optimistic for the future.”              
<br />
<br />

#### ***Entry 2***
* **TITLE:** Introducing Covalence's New Subatomic Plan <br />
* **IMAGE URL:** https://horseman.blob.core.windows.net/uploads/3-501341152996964-subatomic-hero.png <br />
* **CONTENT:** Today, we're excited to announce a new plan at a price we've never offered before: we're calling it the Subatomic plan, and it's only $25/month (or $249/year). It's our most affordable offering, ever. It provides a fundamental foundation for anyone to learn the basic building blocks of software development. And it's only going to get better over time. What is this plan, why is it called Subatomic, and why should you care? Before I can really answer those questions, you need to understand a bit about Covalence, how we see our branding, and a little bit of science. So, please bear with me as I briefly take everyone back to science class for a moment... All matter in our universe is comprised of subatomic elements (protons, neutrons, and electrons). Multiple subatomic elements arranged in particular ways form atoms — the building blocks of, well, pretty much everything that we care about. Multiple atoms form molecules; multiple molecules form cells; multiple cells form organelles, which form organs, and from there we get organisms (you and me!), ecosystems, biospheres, planets... and so on and so forth. Our Brand In a broad sense, our entire branding at Covalence is based on the relationship between the building blocks of life and the forces that hold it together. (We're all pretty much really big geeks over here, believe it or not.) Our company name, Covalence, is based on the covalent bond: when two or more atoms share their electrons, a bond is formed that allows those atoms to form molecules. As we just discussed, that relationship precipitates the avalanche for the rest of life as we know it. Without the forces of nature we're most familiar with to help hold everything together — gravity, electricity, magnetism — nothing would stick. Our service and curriculum can be considered the subatomic elements in this analogy. And, in our case, our knowledge, expertise, and mentorship represent the electrons we share with you as you trust us with the immense responsibility of educating you with a new skillset or preparing you for a new career. Our Full Stack Development bootcamp would be an atom since it combines multiple pieces of our curriculum along with our services to provide a premiere educational experience. Our most basic goal as a company is to make sure everything sticks as you're learning with us. Like a covalent bond, we share our knowledge and expertise with you as you're learning with our curriculum. How much of that you utilize is ultimately up to you, and our product offerings reflect that. Our Plans Until Today Until today, our simplest offering was our Atomic plan. The premise was (and still is) very simple: provide a premiere educational experience for aspiring developers by creating and maintaining relevant and great curriculum, and they can use it as they see fit. If you were interested in using our curriculum and wanted more support, structure, and assistance, you could take advantage of our Molecular plan to receive all of that through personalized help, mentoring, and additional features in our learning management system (aptly named Gravity). If you really wanted to catalyze your transformation of becoming a software developer, our Catalyst program would reduce that reaction time to a mere 12 weeks with an immersive, intense experience with rapid portfolio project development, a comprehensive final assessment, capstone project, professional career prep services built-in, and much, much more. The Subatomic Plan Over the past year, we've been refining our services and products in a variety of ways, and today we're excited to announce a new offering that's a bit more fundamental than those that came before it: the Subatomic plan. Like the subatomic elements that create different atoms when configured in various combinations, our Subatomic plan provides access to the fundamental building blocks of software development with easy-to-understand yet comprehensive curricula and real-world projects for a myriad of topics — starting today with our basic tech literacy and introductory topics included in our Front End Fundamentals course. Over the coming months, we will be expanding the courses included in our Subatomic plan to contain much more than just Front End Fundamentals. We will be creating all-new content for a range of topics, including Getting Started with WordPress, Introductions to Python, C#/.NET, Angular, Vue.js, and more. If you want to be the first to know about when those new topics are released, get a head start by joining the community as a Subatomic member today. The Subatomic plan is not meant to be a viable path for career change in and of itself. For that, we still have our other options that come with more features and support. Subatomic is meant to be a starting point to build a foundation of knowledge; afterwards, it is a way to continually learn new topics, languages, frameworks, and applications — the building blocks of development. Subatomic members will also be able to join Covalence's exclusive developer community. You'll join a community of amazing individuals (current Atomic, Molecular, and Catalyst students as well as alumni) that are all capable and willing to share some knowledge (i.e., electrons) of their own. But sometimes we simply like to have fun, post copious amounts of cat pictures in #petsofcovalence, stream League of Legends, or talk about the latest Smash Bros news or cool GitHub repos we find. For a little less than $0.83/day (~$0.68/day if paid annually), some may even be tempted to say the community alone is worth the price of admission. A Path for Everyone Our Subatomic plan is meant to be an introduction to software development for anyone, no matter their ultimate goal or definition of success. Whether you're a lifelong learner that wants to learn how to code or you're seeking an immersive career change, our Subatomic plan is the perfect place to get started. You can come test drive our curricula and services, come and go as you please (by starting or stopping your subscription at anytime), or upgrade to our more immersive plans if you ever want to take your career change to the next level. Come introduce yourself to a supportive community of developers and begin learning the basics of software development at a price that can't be beat — and do it all from the comfort of your own home — by starting your Subatomic plan today for only $25/month or $249/year. If you have questions, concerns, or even a remote interest in what we do, how we do it, and why, schedule a consult with us. We're always more than happy to help — it's what we do! And, finally, stay tuned for some more big announcements coming soon. If you think we've been quiet at Covalence for the past few months, it's not because we aren't doing anything — it's because we're about to make some serious noise. — Jackson Carr First of His Name, Director of Operations at Covalence, OG Covalence Alumni (Class of '15), and Desperate User of His Physics Degree by Writing Blog Posts that Unnecessarily Contain Way Too Much Science
<br />
<br />

#### ***Entry 3***
* **TITLE:** Dr. Anthony Fauci says chance of coronavirus vaccine <br />
* **IMAGE URL:** https://image.cnbcfm.com/api/v1/image/106588944-1592928376761gettyimages-1222126029.jpeg <br />
* **CONTENT:** White House coronavirus advisor Dr. Anthony Fauci said Friday that the chances of scientists creating a highly effective vaccine — one that provides 98% or more guaranteed protection — for the virus are slim. Scientists are hoping for a coronavirus vaccine that is at least 75% effective, but 50% or 60% effective would be acceptable, too, Fauci, director of the National Institute of Allergy and Infectious Diseases, said during a Q&A with the Brown University School of Public Health. “The chances of it being 98% effective is not great, which means you must never abandon the public health approach.” “You’ve got to think of the vaccine as a tool to be able to get the pandemic to no longer be a pandemic, but to be something that’s well controlled,” he said. The Food and Drug Administration has said it would authorize a coronavirus vaccine so long as it is safe and at least 50% effective. Dr. Stephen Hahn, the FDA’s commissioner, said last month that the vaccine or vaccines that end up getting authorized will prove to be more than 50% effective, but it’s possible the U.S. could end up with a vaccine that, on average, reduces a person’s risk of a Covid-19 infection by just 50%. “We really felt strongly that that had to be the floor,” Hahn said on July 30, adding that it’s “been batted around among medical groups.” “But for the most part, I think, infectious disease experts have agreed that that’s a reasonable floor, of course hoping that the actual effectiveness will be higher.” A 50% effective vaccine would be roughly on par with those for influenza, but below the effectiveness of one dose of a measles vaccination, which is about 93% effective, according to the Centers for Disease Control and Prevention. Public health officials and scientists expect to know whether at least one of the numerous potential Covid-19 vaccines in development worldwide is safe and effective by the end of December or early next year, though there is never a guarantee. Drug companies Pfizer and Moderna both began late-stage trials for their potential vaccines last week and both expect to enroll about 30,000 participants. Fauci has previously said he worries about the “durability” of a coronavirus vaccine, saying if Covid-19 acts like other coronaviruses, it may not provide long-term protection. Health officials say there is no returning to “normal” until there is a vaccine. Fauci’s comment came a day after the World Health Organization cautioned about the development of vaccines, reiterating that there may never be a “silver bullet” for the virus, which continues to rapidly spread worldwide. The phase three trials underway do not necessarily mean that a vaccine is almost ready to be deployed to the public, the agency said. “Phase three doesn’t mean nearly there,” Mike Ryan, executive director of the WHO’s emergencies health program, said during a virtual panel discussion with “NBC Nightly News” Anchor Lester Holt hosted by the Aspen Security Forum. “Phase three means this is the first time this vaccine has been put into the general population into otherwise healthy individuals to see if the vaccine will protect them against natural infection.” While there is hope scientists will find a safe and effective vaccine, there is never a guarantee, WHO Director-General Tedros Adhanom Ghebreyesus said. “We cannot say we have vaccines. We may or may not,” he said. On Friday, Fauci reiterated that he is “cautiously optimistic” scientists will find a safe and effective vaccine. He also reiterated that the coronavirus may never be eliminated, but world leaders can work together to bring the virus down to “low levels.” Some of Fauci’s comments have been at odds with President Donald Trump, who has repeatedly said the virus would “disappear.” Trump, who is seeking reelection, said Thursday that it’s possible the United States could have a safe and effective vaccine for the coronavirus before the upcoming presidential election on Nov. 3.
<br />
<br />

#### ***Entry 4***
* **TITLE:** Welcome <br />
* **IMAGE URL:** (default) <br />
* **CONTENT:** Welcome to the blog!

<br />
<br />
<br />
<br />



## Key Features
Use the info icons to help you properly submit a blog. You can also edit tags with this application; add as many and remove
all but one at any time. Try entering an invalid url and test the 'Not Found' page.<br />
This is important to test: account with different roles; member roles can only view blogs, and admin can edit, delete, post, and view blogs.
You cannot view any blogs without an account, only member and admin can view individual blogs. <br />
Lastly test the error handling, try to create an account with an email that already exists, enter invalid credentials in the
login page, try upload an invalid image, and try submitting forms by submitting invalid syntax for specific fields, 
leaving required fields blank, etc. <br />
There will be feedback indicating you have either completed a Post, Put, and Delete request successfully or indicating that you have logged out. 
 

<br />
<br />
<br />
<br />




## Server
The server build process compiles the TypeScript files found in `/src/server` into a single bundled JavaScript file located in the `/dist` directory.
<br />
<br />
<br />
<br />


## Client
The client build process compiles the React app located in `/src/client` into a bundled located at `/public/js/app.js`.

The client configuration will also build the Sass files found at `/src/client/scss`. The App component imports the `app.scss` file which already includes an import for Bootstrap.
<br />
<br />
<br />
<br />


## Running the project
In order to run the server, use `npm run dev`, and the server will start on port 3000 (http://localhost:3000). 

Webpack will watch the files. Once you save a file, you can refresh your browser to ensure you got the updated client files. If you only change server files, you *shouldn't* need to refresh.
