import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
//image
import blogImg from '../../assets/image/blogImg.png'
//css
import './Blog.css';
const Blog = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="blog_section">
      <span className="blog_heading">Blog</span>
      <div className="blog_left blog_center">
        <div className="blog_full">
          <img className="blog_image" src={blogImg} alt="img"/>
          <div className="blog_content">
            <p className="blog_title">
              How to Write a Blog Post:A Step-by-Step Guide
            </p>
            <p className="blog_desc">LANGUAGE | WRITING | 5MIN READ</p>
          </div>
        </div>
        <div className="blog_half_container blog_center">
          <div className="blog_half">
          <img className="blog_h_image" src={blogImg} alt="img"/>
            <div className="blog_h_content">
              <p className="blog_h_title">
                How to Write a Blog Post:A Step-by-Step Guide
              </p>
              <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
            </div>
          </div>
          <div className="blog_half">
          <img className="blog_h_image" src={blogImg} alt="img"/>
            <div className="blog_h_content">
              <p className="blog_h_title">
                How to Write a Blog Post:A Step-by-Step Guide
              </p>
              <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
            </div>
          </div>
          <div className="blog_half">
          <img className="blog_h_image" src={blogImg} alt="img"/>
            <div className="blog_h_content">
              <p className="blog_h_title">
                How to Write a Blog Post:A Step-by-Step Guide
              </p>
              <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
            </div>
          </div>
          <div className="blog_half">
          <img className="blog_h_image" src={blogImg} alt="img"/>
            <div className="blog_h_content">
              <p className="blog_h_title">
                How to Write a Blog Post:A Step-by-Step Guide
              </p>
              <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
            </div>
          </div>
          <div className="blog_half">
          <img className="blog_h_image" src={blogImg} alt="img"/>
            <div className="blog_h_content">
              <p className="blog_h_title">
                How to Write a Blog Post:A Step-by-Step Guide
              </p>
              <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
            </div>
          </div>
          <div className="blog_half">
          <img className="blog_h_image" src={blogImg} alt="img"/>
            <div className="blog_h_content">
              <p className="blog_h_title">
                How to Write a Blog Post:A Step-by-Step Guide
              </p>
              <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
            </div>
          </div>
        </div>
      </div>
      <div className="blog_right">
        <div className="blog_mp">Most Popular</div>
        <div className="blog_box">
          <p className="blog_h_title">
            {" "}
            How to Write a Blog Post:A Step-by-Step Guide
          </p>
          <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
        </div>
        <div className="blog_box">
          <p className="blog_h_title">
            {" "}
            How to Write a Blog Post:A Step-by-Step Guide
          </p>
          <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
        </div>
        <div className="blog_box">
          <p className="blog_h_title">
            {" "}
            How to Write a Blog Post:A Step-by-Step Guide
          </p>
          <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
        </div>
        <div className="blog_box">
          <p className="blog_h_title">
            {" "}
            How to Write a Blog Post:A Step-by-Step Guide
          </p>
          <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
        </div>
        <div className="blog_box">
          <p className="blog_h_title">
            {" "}
            How to Write a Blog Post:A Step-by-Step Guide
          </p>
          <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
        </div>
        <div className="blog_box">
          <p className="blog_h_title">
            {" "}
            How to Write a Blog Post:A Step-by-Step Guide
          </p>
          <p className="blog_h_desc">LANGUAGE | WRITING | 5MIN READ</p>
        </div>
        <div className="blog_subscribe blog_center">
          <p className="blog_via">Subscribe via Email</p>
          <p className="blog_add">Email Address</p>
          <input
            className="blog_inp_email"
            type="email"
            name="email"
            placeholder=""
          ></input>
          <p className="blog_s_desc">
            We're committed to your policy. Neurolingua uses the information you
            provide to us to contact you about our relevant content, products,
            and services. You may unsubscribe from these communications at any
            time. For more information, check out our{" "}
            <Link to="/privacy-policy">privacy policy.</Link>
          </p>
          <button className="blog_s_btn">Subscribe</button>
        </div>
        <div className="blog_lt blog_center">
          <div className="blog_lang">
            <p className="blog_head">Language</p>
            <p className="blog_type">English</p>
            <p className="blog_type">English</p>
            <p className="blog_type">English</p>
            <p className="blog_type">English</p>
            <p className="blog_type">English</p>
          </div>
          <div className="blog_tags">
            <p className="blog_head">Tags</p>
            <p className="blog_type">Tag 1</p>
            <p className="blog_type">Tag 2</p>
            <p className="blog_type">Tag 3</p>
            <p className="blog_type">Tag 4</p>
            <p className="blog_type">Tag 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
