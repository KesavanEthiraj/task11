import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { Table } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import "./form.css";
import "./task.css";

function Form1() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  //validate error assign start
  const validate = (values) => {
    const errors = {};
    if (!values.userId) {
      errors.userId = "Required";
    }

    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length < 8) {
      errors.title = "Must be more than 7 Characters";
    }
    if (!values.body) {
      errors.body = "Required";
    } else if (values.body.length < 8) {
      errors.body = "Must be more than 7 Characters";
    }
    return errors;
  };

  //validate error assign end
  const formic = useFormik({
    //inital values
    initialValues: {
      userId: "",
      title: "",
      body: "",
    },
    //validation
    validate,
    //onsubmit alert
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      newpost();
      formic.values.userId = "";
      formic.values.title = "";
      formic.values.body = "";
    },
  });

// State has been used only to read and store the data through API
  const [state, setState] = useState({
    post: [],
  });
  useEffect(async () => {
    const posts = await getpost();

    setState({ ...state, post: posts });
  }, []);
  // read post
  const getpost = async () => {
    try {
      const { data } = await axios.get(URL);

      return data;
    } catch (err) {
      console.log(err);
    }
  };
  //end read post

  //new post
  const newpost = async () => {
    try {
      const { data } = await axios.post(URL, {
        userId: formic.values.userId,
        title: formic.values.title,
        body: formic.values.body,
      });

      const post = [...state.post];
      post.push(data);

      setState({ ...state, post: post });
    } catch (err) {
      console.log(err);
    }
  };
  //end new post
  /// Delete start
  const deletefun = async (postid) => {
    await axios.delete(`${URL}/${postid}`);

    let post = [...state.post];
    post = post.filter(({ id }) => id !== postid);
    setState({ ...state, post });
  };

  ///delete End

  return (
    <div>
      <div className="body">
        <h1 className="title"> Add User </h1>
        <br></br>
        <form onSubmit={formic.handleSubmit}>
          <div cl>
            <label className="lable" htmlFor="email">
              Userid
            </label>
            <input
              className="input"
              onBlur={formic.handleBlur}
              type="number"
              onChange={formic.handleChange}
              value={formic.values.userId}
              id="userId"
              name="userId"
            ></input>
            {formic.touched.userId && formic.errors.userId ? (
              <div>{formic.errors.userId}</div>
            ) : (
              ""
            )}
          </div>
          <br></br>

          <div>
            <label className="lable" htmlFor="title">
              Title
            </label>
            <input
              className="input"
              onBlur={formic.handleBlur}
              type="text"
              onChange={formic.handleChange}
              value={formic.values.title}
              id="title"
              name="title"
            ></input>
            {formic.touched.title && formic.errors.title ? (
              <div>{formic.errors.title}</div>
            ) : (
              ""
            )}
          </div>
          <br></br>

          <div>
            <label className="lable" htmlFor="title">
              body
            </label>
            <input
              className="input"
              onBlur={formic.handleBlur}
              type="text"
              onChange={formic.handleChange}
              value={formic.values.body}
              id="body"
              name="body"
            ></input>
            {formic.touched.body && formic.errors.body ? (
              <div>{formic.errors.body}</div>
            ) : (
              ""
            )}
          </div>
          <br></br>

          <button className="button" type="submit">
            Newuser
          </button>
        </form>
      </div>
      {
        //list
      }
      <Table striped bordered hover variant="dark">
        <thead>
          <tr width="1000px">
            <td className="class2">
              <th className="class2"> User Id </th>{" "}
              <th className="class2"> Id </th>{" "}
              <th className="class3"> Title </th>{" "}
              <th className="class4"> Body </th> <th > Action </th>
            </td>
          </tr>
        </thead>
        <tbody>
          {state.post.map(({ userId, id, title, body }) => {
            return (
              <tr key={id}>
                <tr key={id}>
                  <td className="class2">{userId}</td>
                  <td className="class2">{id}</td>
                  <td className="class3">{title}</td>
                  <td className="class4"> {body}</td>
                  <td className="delete">
                    <Button  variant="danger" onClick={() => deletefun(id)}>
                      delete
                    </Button>
                    {
                      // <Button variant="primary" onClick={() => selectfun(id)}>
                      //   Edit
                      // </Button>
                    }
                  </td>
                </tr>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Form1;
