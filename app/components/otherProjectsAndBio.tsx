export const OtherProjectsAndBio: React.FC = () => (
  <div
    className="
        flex flex-col
        lg:flex-row
        items-center
        lg:items-start
        justify-center
        p-6
        bg-clay-300
      "
  >
    <div className="prose">
      <h1 className="text-mineral text-center">Other Projects</h1>

      <p className="text-mineral">
        I have been teaching myself to develop software for over two years now.
        The projects in the previous section are my best and brightest, but
        there are a myriad of other smaller projects in my portfolio that I have
        created along my learning journey.
      </p>

      <ul className="px-6 list-disc list-outside">
        <li className="text-mineral text-sm">
          The <code>teacherhelper</code> Python library, which containes useful
          abstractions and a CLI to make teaching more scriptable.{" "}
          <a href="https://github.com/jdevries3133/teacher_helper">GitHub</a>,{" "}
          <a href="https://pypi.org/project/teacherhelper/">PyPi</a>,{" "}
          <a href="https://teacherhelper.jackdevries.com/">Docs</a>
        </li>
        <li className="text-mineral text-sm">
          Terraform modules to factor repetitive config out of my projects that
          use Terraform for Infrastructure as Code (IaC).{" "}
          <a href="https://registry.terraform.io/modules/jdevries3133/basic-deployment/kubernetes/latest">
            basic-deployment
          </a>
          ,{" "}
          <a href="https://registry.terraform.io/modules/jdevries3133/container-deployment/kubernetes/latest">
            container-deployment
          </a>
        </li>
        <li className="text-mineral text-sm">
          A variety of command line tools, including a nifty tool for running
          parallel processes called <code>rn</code> using only the Python
          Standard Library.{" "}
          <a href="https://github.com/jdevries3133/shell_scripts">GitHub</a>
        </li>
        <li className="text-mineral text-sm">
          Some very elaborate web-based scavenger hunts for friends.{" "}
          <a href="https://github.com/jdevries3133/chaotic_christmas_present">
            GitHub (#1)
          </a>
          ,{" "}
          <a href="https://github.com/jdevries3133/nicks_birthday_2021">
            GitHub (#2)
          </a>
        </li>
        <li className="text-mineral text-sm">
          Classroom Mass Delete: a browser extension to automate tedious
          deletion of old Google Classroom assignments.{" "}
          <a href="https://github.com/jdevries3133/google_classroom_mass_delete">
            GitHub
          </a>
        </li>
        <li className="text-mineral text-sm">
          EA Poster Vote: a website for my students to vote on their favorite
          concert posters.{" "}
          <span className="italic">
            Live demo available upon request due to private student personal
            information.{" "}
          </span>
          <a href="https://github.com/jdevries3133/ea_music/">GitHub</a>
        </li>
        <li className="text-mineral text-sm">
          Bon Appétit website scraper.{" "}
          <a href="https://github.com/jdevries3133/scrape_recepies">GitHub</a>
        </li>
        <li className="text-mineral text-sm">
          A program to automatically create seating cards for my students’
          concert.{" "}
          <span className="italic">
            One of my first ever programming projects!{" "}
          </span>
          <a href="https://github.com/jdevries3133/concert_seating_cards">
            GitHub
          </a>
        </li>
        <li className="text-mineral text-sm">
          Simple programs to learn about the C Programming Language.{" "}
          <a href="https://github.com/jdevries3133/learning_c">GitHub</a>
        </li>
        <li className="text-mineral text-sm">
          Created a bot to watch for a PS5.{" "}
          <a href="https://github.com/jdevries3133/ps5_stock_check">GitHub</a>
        </li>
      </ul>
    </div>
    <div className="max-w-prose">
      {/* education background */}
      <div className="prose">
        <h1 className="text-center text-mineral">My Background</h1>
        <p className="text-mineral">
          Two years ago, my journey towards software development began. Once I
          started learning to write code and I saw the potential of what I could
          create, my interest and commitment to learning more never stopped.
          Considering my background as a professional educator, the only thing
          about this experience that hasn't surprised me was my passion and
          dedication towards mastering this new craft.
        </p>
        <p className="text-mineral">
          After graduating with a B.M. in Music Education and Jazz Studies from
          William Paterson University of New Jersey in January 2020, I started
          working as a music teacher in K-12 schools. I have enjoyed that work a
          lot, but I've also spent time close to the problems in the American
          education system. As an amateur programmer, I've seen how my skills
          can have an impact on teachers and learners, and I hope that
          continuing to grow as a software engineer will empower me to solve
          some of the problems I have seen as an educator.
        </p>
        <p className="text-mineral">
          What I know for sure is that my interest in software development has
          truly swept me away, and it's become hard for me to spend my time
          doing anything else. I am ready to take my passion and curiosity to
          the next level.
        </p>
      </div>
    </div>
  </div>
);
