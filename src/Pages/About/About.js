import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="about__content">
        <p className="about__title">About</p>
        <div className="about__detail">
          <h1>Evangadi Newtorks Q&A</h1>
          <p>
            No matter what stage of life you are in, wheather you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
            <br />
            <br />
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
        </div>
        <button className="col-5 border-none">HOW IT WORKS</button>
      </div>
    </div>
  );
}

export default About;
