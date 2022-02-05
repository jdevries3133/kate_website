/**
 * Future employers, look away!! I started building this site as a single
 * html file, and grew it from there. This is obviously quite gnarly because
 * I just took the big hand-coded index page and shoved it in here.
 *
 * Obviously, at minimum, the three identical video cards should be factored
 * out into a separate component, and if I ever update this part of the site,
 * they certainly will be!
 */

import { useState } from "react";
import { MetaFunction } from "@remix-run/react/routeModules";

import { ContactForm } from "~/components/contactForm";
import { ActionFunction, useActionData, useTransition } from "remix";
import prisma from "~/prisma.server";

export const meta: MetaFunction = () => {
  return { title: "Jack DeVries" };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const message = form.get("message");

  const errors = {
    email: "",
    name: "",
  };
  if (!name) errors.name = "Please enter your name";
  if (!email) errors.email = "Please enter your email";

  const values = {
    name: (name as string) || "",
    email: (email as string) || "",
    message: (message as string) || "",
  };

  if (!errors.name && !errors.email) {
    await prisma.contactInquiry.create({
      data: values,
    });
    return {
      values,
      status: "submitted",
    };
  }

  return {
    values: values,
    errors,
  };
};

export default function Index() {
  const [moreMe, setMoreMe] = useState(false);
  const [moreProjects, setMoreProjects] = useState(false);
  const actionData = useActionData();

  return (
    <>
      {/* first section: landing page */}
      <div
        className="
        min-h-screen
        pb-6
        bg-mineral-600
        flex flex-col
        lg:flex-row lg:gap-12 lg:justify-center
      "
      >
        {/* name and greeting */}
        <div
          className="
          flex flex-col flex-grow
          lg:flex-grow-0 lg:justify-center lg:gap-6
        "
        >
          <h1
            className="
            py-3
            text-2xl text-center
            flex-shrink
            lg:flex-shrink-0 lg:text-4xl
          "
          >
            Hello there!
          </h1>
          <div
            className="
            flex flex-row flex-grow
            lg:flex-grow-0
            justify-center
            items-center
          "
          >
            <div className="px-6 text-right">
              <h3 className="text-sm sm:text-3xl">Jack DeVries</h3>
              <h4 className="text-sm sm:text-base">Web & Software Developer</h4>
            </div>
            <div className="w-24 lg:w-48 p-2 bg-primary-100 rounded-full shadow">
              <img className="rounded-full" src="./static/me@400px.jpg" />
            </div>
          </div>
        </div>

        {/* tech icons */}
        <div className="flex items-center">
          <div
            className="
            flex-shrink
            lg:flex-shrink-0
            max-w-lg
            m-auto
            lg:col-span-3
            lg:bg-coffee
            lg:border-2
            lg:border-primary-200
            lg:m-4
            lg:p-4
            lg:rounded
          "
          >
            <h2 className="text-center text-xl pb-2">My Toolbox</h2>
            <div
              className="
              grid grid-cols-3
              mx-3
              gap-2
              items-center
              justify-items-center
            "
            >
              {/* react */}
              <div data-tooltip="React" className="tooltip">
                <img alt="react.js icon" src="./static/react.webp" />
              </div>
              {/* redux */}
              <div data-tooltip="Redux" className="tooltip">
                <img
                  className="w-full h-full"
                  alt="redux icon"
                  src="./static/redux.svg"
                />
              </div>
              {/* django */}
              <div data-tooltip="Django" className="tooltip">
                <img alt="django icon" src="./static/django.svg" />
              </div>
              {/* django REST framework */}
              <div
                data-tooltip="Django REST Framework"
                className="tooltip-drf tooltip"
              >
                <img
                  className="rounded-md"
                  alt="django REST framework icon"
                  src="./static/drf.webp"
                />
              </div>
              {/* tailwind */}
              <div
                data-tooltip="Tailwind CSS"
                className="tooltip-wide tooltip flex items-center col-span-2"
              >
                <img
                  alt="Tailwind CSS icon"
                  src="./static/tailwind.svg"
                  className="w-full h-full"
                />
              </div>
              {/* javascript */}
              <div data-tooltip="Javascript" className="tooltip">
                <img
                  className="rounded-md"
                  alt="javascript icon"
                  src="./static/js.webp"
                />
              </div>
              {/* git */}
              <div
                data-tooltip="Git"
                className="tooltip p-2 flex items-center bg-clay-100 rounded-md"
              >
                <img alt="git icon" src="./static/git.webp" />
              </div>
              {/* typescript */}
              <div data-tooltip="Typescript" className="tooltip-left-0 tooltip">
                <img
                  className="rounded-md"
                  alt="typescript icon"
                  src="./static/ts.webp"
                />
              </div>
              {/* python */}
              <div
                data-tooltip="Python"
                className="tooltip-wide tooltip col-span-2"
              >
                <img alt="python icon" src="./static/python.svg" />
              </div>
              {/* PostgreSQL */}
              <div data-tooltip="PostgreSQL" className="tooltip-left-0 tooltip">
                <img alt="postgreSQL icon" src="./static/psql.webp" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* second section: projects */}
      <div className="py-6 bg-secondary-700">
        <h1 className="text-primary-500 text-center">My Projects</h1>
        <div
          className="
          lg:grid lg:grid-cols-3 lg:items-start
          m-auto
          container
          flex flex-col
          items-center
          p-4
          gap-4
        "
        >
          {/* begin fast grader card */}
          <div className="max-w-prose bg-clay-100 w-full rounded-md">
            <div>
              <div className="rounded-t-md sticky p-2 bg-clay-400 top-0 shadow-xl">
                <div className="rounded-b-md">
                  <h3 className="text-mineral inline xl:text-3xl">
                    Fast Grader
                  </h3>
                  <h4 className="text-mineral inline">for Google Classroom</h4>
                </div>
                <video
                  muted
                  controls
                  loop
                  aria-label="demo video"
                  autoPlay
                  className="border-2 border-mineral-700 border-opacity-50"
                >
                  <source src="./static/fast_grader.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="px-3 sm:text-justify text-gray-600">
                I was inspired by the design philosophy of <code>vim</code> to
                create this minimal and efficient keyboard-driven tool to help
                teachers provide grades and feedback for their google
                classNameroom assignments.
              </p>
              <p className="px-3 sm:text-justify text-gray-600">
                The backend stack is PostgreSQL, Django, and Django REST
                Framework. I deployed the site to a machine running Ubuntu
                Server. The backend utilizes the Google Drive and Google
                Classroom APIs to fetch user data. I also used Python's
                <a
                  className="link"
                  href="https://docs.python.org/3/library/difflib.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  difflib
                </a>
                to implement a feature where teachers can view only the
                differences between the template they provide to students, and
                the actual student submission.
              </p>
              <p className="px-3 sm:text-justify text-gray-600">
                On the frontend of this project, I used
                <a
                  className="link"
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
                and
                <a
                  className="link"
                  href="https://htmx.org/docs/#introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  htmx
                </a>
                to facilitate rapid prototyping, and minimize code repetition.
                This choice has also effectively me to inject UI with dynamic
                data into the browser extension from the backend, which has been
                pretty neat!
              </p>
            </div>

            <div className="py-3 flex flex-row justify-center gap-10">
              <a
                href="https://classNamefast.app"
                rel="noopener noreferrer"
                target="_blank"
              >
                <button
                  className="
                  text-xl
                  bg-primary-300
                  rounded
                  p-1
                  text-mineral text-bold
                  hover:bg-primary-400
                  transition
                  shadow-md
                  hover:shadow-none
                "
                >
                  Live Site
                </button>
              </a>

              <a
                href="https://github.com/jdevries3133/fast_grader"
                rel="noopener noreferrer"
                target="_blank"
              >
                <button
                  className="
                  bg-secondary-300
                  transition
                  text-xl text-mineral text-bold
                  hover:bg-secondary-400
                  rounded
                  p-1
                  shadow-md
                  hover:shadow-none
                "
                >
                  GitHub
                </button>
              </a>
            </div>
          </div>
          {/* end fast grader card */}
          {/* begin song maker card */}
          <div className="max-w-prose bg-clay-100 w-full rounded-md">
            <div>
              <div className="rounded-t-md sticky p-2 bg-clay-400 top-0 shadow-xl">
                <div className="rounded-b-md">
                  <h3 className="xl:text-3xl text-mineral">
                    Song Maker Gallery
                  </h3>
                </div>
                <video
                  muted
                  controls
                  loop
                  aria-label="demo video"
                  autoPlay
                  className="border-2 border-mineral-700 border-opacity-50"
                >
                  <source src="./static/songmaker.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="px-3 sm:text-justify text-gray-600">
                The Song Maker Gallery is a dynamic web application used by
                music teachers to present galleries of student compositions made
                in the
                <a
                  className="link"
                  href="https://musiclab.chromeexperiments.com/Song-Maker/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Chrome Music Lab.
                </a>
              </p>
              <p className="px-3 sm:text-justify text-gray-600">
                It currently has 606 active users, 622 galleries created, and
                over 24,000 student songs uploaded! It was built with Django,
                Django REST Framework, and MySQL on the backend, and React on
                the frontend, plus several additional frontend and backend
                libraries.
              </p>
              <p className="px-3 sm:text-justify text-gray-600">
                Visit the site and inspect the song thumbnails in your browser –
                they are all dynamically generated SVG on the frontend, with the
                backend serving representations of the song in the MIDI file
                format! This optimization significantly reduced the
                application’s bandwidth and storage needs.
              </p>
            </div>
            <div className="py-3 flex flex-row justify-center gap-10">
              <a
                href="https://songmakergallery.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <button
                  className="
                  text-xl
                  bg-primary-300
                  rounded
                  p-1
                  text-mineral text-bold
                  hover:bg-primary-400
                  transition
                  shadow-md
                  hover:shadow-none
                "
                >
                  Live Site
                </button>
              </a>

              <a
                href="https://github.com/jdevries3133/song_maker_gallery"
                rel="noopener noreferrer"
                target="_blank"
              >
                <button
                  className="
                  bg-secondary-300
                  transition
                  text-xl text-mineral text-bold
                  hover:bg-secondary-400
                  rounded
                  p-1
                  shadow-md
                  hover:shadow-none
                "
                >
                  GitHub
                </button>
              </a>
            </div>
          </div>
          {/* end songmaker card */}
          {/* end open source card */}
          <div className="max-w-prose bg-clay-100 w-full rounded-md">
            <div>
              <div className="rounded-t-md sticky p-2 bg-clay-400 top-0 shadow-xl">
                <div className="rounded-b-md">
                  <h3 className="xl:text-3xl inline text-mineral">cpython</h3>
                  <h4 className="inline text-mineral inline">
                    Open Source Contributing
                  </h4>
                </div>
                <video
                  muted
                  controls
                  loop
                  aria-label="demo video"
                  autoPlay
                  className="border-2 border-mineral-700 border-opacity-50"
                >
                  <source src="./static/py_contrib.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="px-3 sm:text-justify text-gray-600">
                In June, July, and August of 2021, I committed myself to
                contributing to Cpython full-time. Cpython is the reference
                implementation of the Python programming language, and it
                contains the Python interpreter, standard library, and official
                documentation.
              </p>
              <p className="px-3 sm:text-justify text-gray-600">
                Many of my contributions were towards documentation, the most
                significant of which was my rewrite of the new documentation for
                <a
                  href="https://docs.python.org/3/library/__main__.html"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  <span className="font-mono">__main__.</span>
                </a>
                Eventually, I became more familiar with the huge Cpython
                codebase, and I am extremely proud to say that my code
                contributions were eventually merged into Python's standard
                libraries
                <code>rlcompleter</code>, <code>tarfile</code>, and
                <code>argparse</code>. I also wrote a patch in <code>C</code>,
                which became part of the implementation of the new
                <a
                  href="https://docs.python.org/3/whatsnew/3.10.html#pep-634-structural-pattern-matching"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  structural pattern matching feature
                </a>
                in Python 3.10.
              </p>
            </div>
            <div className="py-3 flex flex-row justify-center gap-10">
              <a
                href="https://github.com/python/cpython/commits/main?author=jdevries3133"
                rel="noopener noreferrer"
                target="_blank"
              >
                <button
                  className="
                  text-xl
                  bg-primary-300
                  rounded
                  p-2
                  text-mineral text-bold
                  hover:bg-primary-400
                  transition
                  shadow-md
                  hover:shadow-none
                "
                >
                  <p className="p-0 text-mineral text-bold text-xl">
                    View My Contributions
                  </p>
                  <p className="p-0 m-0 text-sm text-mineral">on GitHub</p>
                </button>
              </a>
            </div>
          </div>
          {/* end open source card */}
        </div>
      </div>
      {/* other projects section */}
      <div
        className="
        flex flex-col
        lg:flex-row
        items-center
        lg:items-start
        justify-center
        py-6
        bg-clay-300
      "
      >
        <div className="max-w-prose">
          <h1 className="text-mineral text-center">Other Projects</h1>

          <div className="p-2">
            <p className="text-mineral">
              I have been teaching myself to develop software for over two years
              now. The projects in the previous section are my best and
              brightest, but there are a myriad of other smaller projects in my
              portfolio that I have created along my learning journey.
            </p>

            <ul className="px-6 list-disc list-outside">
              <li className="text-mineral text-sm">
                created a variety of command line tools, including a nifty tool
                for running parallel processes called <code>rn</code> using only
                the Python Standard Library (
                <a
                  href="https://github.com/jdevries3133/shell_scripts"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  view on GitHub
                </a>
                )
              </li>
              <li className="text-mineral text-sm">
                created some very elaborate web-based scavenger hunts for
                friends (
                <a
                  href="https://github.com/jdevries3133/chaotic_christmas_present"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  Chaotic Christmas Present on GitHub
                </a>
                ,
                <a
                  href="https://github.com/jdevries3133/nicks_birthday_2021"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  Birthday Present on GitHub
                </a>
                )
              </li>
              <li className="text-mineral text-sm">
                created a browser extension to automate tedious deletion of old
                Google Classroom assignments (
                <a
                  href="https://github.com/jdevries3133/google_classNameroom_mass_delete"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  view on GitHub
                </a>
                )
              </li>
              <li className="text-mineral text-sm">
                created a PyPi-published package for automating my work as a
                teacher (
                <a
                  href="https://github.com/jdevries3133/teacher_helper"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  view on GitHub
                </a>
                or
                <a
                  href="https://pypi.org/project/teacherhelper/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  PyPi
                </a>
                )
              </li>
              <li className="text-mineral text-sm">
                created a website to publicize my school’s instrument drive (
                <a
                  href="https://github.com/jdevries3133/empacad_music"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  view GitHub
                </a>
                or
                <a
                  href="https://empacadmusic.org/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  live site
                </a>
                )
              </li>
              {moreProjects ? (
                <>
                  <li className="text-mineral text-sm">
                    scraped every recipe from the Bon Appétit website (
                    <a
                      href="https://github.com/jdevries3133/scrape_recepies"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="link"
                    >
                      view on GitHub
                    </a>
                    )
                  </li>
                  <li className="text-mineral text-sm">
                    wrote a program to automatically create seating cards for my
                    students’ concert (
                    <a
                      href="https://github.com/jdevries3133/concert_seating_cards"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="link"
                    >
                      view on GitHub
                    </a>
                    )
                  </li>
                  <li className="text-mineral text-sm">
                    wrote some simple programs to become comfortable with C (
                    <a
                      href="https://github.com/jdevries3133/learning_c"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="link"
                    >
                      view on GitHub
                    </a>
                    )
                  </li>
                  <li className="text-mineral text-sm">
                    created a bot to watch for a PS5 (
                    <a
                      href="https://github.com/jdevries3133/ps5_stock_check"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="link"
                    >
                      view on GitHub
                    </a>
                    )
                  </li>
                  <li className="text-mineral text-sm">
                    read Automate the Boring Stuff with Python by Al Sweigart
                  </li>
                  <li className="text-mineral text-sm">
                    completed the Udemy course, React - The Complete Guide (incl
                    Hooks, React Router, Redux) by Maximilian Schwarzmüller
                  </li>
                </>
              ) : (
                <button
                  onClick={() => setMoreProjects(true)}
                  className="
                bg-primary-300
                rounded
                p-2
                mt-2
                hover:bg-primary-400
                shadow-md
                hover:shadow-none
              "
                >
                  Read More
                </button>
              )}
            </ul>
          </div>
        </div>
        <div className="max-w-prose">
          {/* education background */}
          <div>
            <h1 className="text-center text-mineral">My Background</h1>
            <p className="text-mineral p-2">
              Two years ago, my journey towards software development began. Once
              I started learning to write code and I saw the potential of what I
              could create, my interest and commitment to learning more never
              stopped. Considering my background as a professional educator, the
              only thing about this experience that hasn't surprised me was my
              passion and dedication towards mastering this new craft.
            </p>
            {moreMe ? (
              <p className="text-mineral p-2">
                After graduating with a B.M. in Music Education and Jazz Studies
                from William Paterson University of New Jersey in January 2020,
                I started working as a music teacher in K-12 schools. I have
                enjoyed that work a lot, but I've also spent time close to the
                problems in our education system. To be honest, it is my
                lifelong dream to have a broad and positive impact on education,
                but I know that grinding out a 30-year career in the classroom
                is not necessarily the only path towards that goal.
              </p>
            ) : (
              <button
                onClick={() => setMoreMe(true)}
                className="
              bg-primary-300
              rounded
              p-2
              mt-2
              hover:bg-primary-400
              shadow-md
              hover:shadow-none
            "
              >
                Read More
              </button>
            )}
            <p className="text-mineral p-2">
              What I know for sure is that my interest in software development
              has truly swept me away, and it's become hard for me to spend my
              time doing anything else. I am ready to take my passion and
              curiosity to the next level.
            </p>
          </div>
        </div>
      </div>
      <div className="py-6 bg-gradient-to-br from-primary-100 to-clay-100">
        <div className="container flex items-center justify-center m-auto">
          <div className="max-w-prose">
            <div className="py-4 flex items-center justify-center">
              <h1
                className="
                text-mineral
                bg-clay-100
                p-1
                rounded
                shadow-lg
                inline-block
              "
              >
                I Am
              </h1>
            </div>
            {/* styled in css file */}
            <div className="character-icons m-2 p-2">
              <div>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p>Creative</p>
              </div>

              <div>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p>Hard Working</p>
              </div>
              <div>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  />
                </svg>
                <p>Passionate</p>
              </div>
              <div>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <p>Determined</p>
              </div>
              <div>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <p>Perseverant</p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
                <p>Honest</p>
              </div>
            </div>

            <div className="bg-clay-100 shadow-md rounded-md m-2 p-2 lg:p-6">
              <p className="text-justify lg:text-lg text-black">
                I have spent a lot of time working on software projects big and
                small. I know how to navigate large codebases and make
                meaningful contributions to them. I also have followed
                best-practices for my new projects, and I've encountered
                software development methodologies in a hands-on way to help me
                manage my own larger projects.
              </p>
              <p className="text-justify text-black lg:text-lg">
                Overall, I feel ready, and I hope that we can meet soon so that
                I can show you that I am.
              </p>
            </div>
            <div className="contact-form-container">
              <div className="flex items-center justify-center w-full">
                {actionData?.status === "submitted" ? (
                  <div className="bg-clay-100 rounded-md shadow p-2 m-2">
                    <h3 className="text-black font-bold">
                      Thanks, {actionData.values.name}!
                    </h3>
                    <p>I'll get back to you soon.</p>
                  </div>
                ) : (
                  <ContactForm />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
