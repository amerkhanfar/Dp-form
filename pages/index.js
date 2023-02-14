import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(true);
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [colleague, setColleague] = useState("");

  const regex = "/^w+([.-]?w+)@w+([.-]?w+)(.w{2,3})+$/";
  const data = {
    name,
    client_email: email + "@dpworld.com",
    colleague_email: colleague + "@dpworld.com",
    message,
  };
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(data);

    setTimeout(() => {
      setStep(!step);
      setLoader(false);
      setEmail("");
      setName("");
      setColleague("");
      setMessage("");
    }, 2000);

    try {
      await axios.post("https://oplus.dev/apps/dw_game/api/save", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
      // show error message
    }
  };
  return (
    <>
      {loader ? (
        <div className='overlay'>
          <ColorRing
            visible={true}
            height='200'
            width='200'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={[
              "#CA2D60",
              "#5EB47C",
              "#EAE8EC",
              "#ffffff",
              "#ffffff",
              "#ffffff",
            ]}
          />
        </div>
      ) : null}
      <div className={`${step ? "" : "sign-up-mode"} container`}>
        <div className='forms-container'>
          <div className='signin-signup'>
            <form action='#' className='sign-in-form'>
              <h2 className='title'>Nominate A Colleague to Challenge</h2>
              <div className='input-field'>
                <i className='fas fa-user'></i>
                <input
                  type='text'
                  placeholder='Your Name'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className='input-field'>
                <i className='fas fa-user'></i>

                <input
                  type='text'
                  placeholder='Your Email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div>@Dpworld.com</div>
              </div>
              <div className='input-field'>
                <i className='fas fa-lock'></i>
                <input
                  type='text'
                  placeholder='Colleague Email'
                  value={colleague}
                  onChange={(e) => {
                    setColleague(e.target.value);
                  }}
                />
                <div>@Dpworld.com</div>
              </div>
              <input
                type='submit'
                value='Next'
                className={`btn solid ${
                  !name.length ||
                  !email.length ||
                  !/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(
                    email + "@dpworld.com",
                  ) ||
                  !/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(
                    colleague + "@dpworld.com",
                  )
                    ? "disabled"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setStep(!step);
                }}
              />
            </form>

            <form action='#' className='sign-up-form'>
              <h2 className='title'>Leave Your Message</h2>
              <textarea
                className='input-field area'
                placeholder='Leave Your Message Or Challenge'
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}></textarea>
              <input
                type='submit'
                className='btn'
                value='Submit'
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>

        <div className='panels-container'>
          <div className='panel left-panel'>
            <img src='/white.png' className='image' alt='' />
          </div>
          <div className='panel right-panel'>
            <img src='/white.png' className='image' alt='' />
          </div>
        </div>
      </div>
    </>
  );
}
