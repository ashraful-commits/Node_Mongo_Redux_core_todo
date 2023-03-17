import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useReducer } from 'react';

// reducer function
const ReducerFunc = (state, { type, payload }) => {
  switch (type) {
    case 'INPUT':
      return {
        ...state,
        input: payload,
      };
    case 'ALLLIST':
      return {
        ...state,
        allList: payload,
      };
    default:
      return state;
  }
};
const Home = () => {
  // reducer
  const [state, dispatch] = useReducer(ReducerFunc, {
    input: { text: '' },
    allList: [],
  });
  // react toastify
  const notify = (msg, type = 'error') => {
    if (type === 'error') {
      toast.error(`${msg}`, {
        position: 'top-center',
        autoClose: 1000,
        pauseOnHover: false,
      });
    } else if (type === 'warning') {
      toast.warning(`${msg}`, {
        position: 'top-center',
        autoClose: 1000,
        pauseOnHover: false,
      });
    } else if (type === 'info') {
      toast.info(`${msg}`, {
        position: 'top-center',
        autoClose: 1000,
        pauseOnHover: false,
      });
    } else if (type === 'success') {
      toast.success(`${msg}`, {
        position: 'top-center',
        autoClose: 1000,
        pauseOnHover: false,
      });
    }
  };
  // handel input chagnge
  const handleChange = (e) => {
    dispatch({
      type: 'INPUT',
      payload: {
        ...state.input,
        [e.target.name]: e.target.value,
      },
    });
    console.log(state.input);
  };
  // submite action
  const handlesubmite = (e) => {
    e.preventDefault();
    if (state.input.text) {
      notify('Success!', 'success');
      axios
        .post('http://localhost:4040/Api/v2/todo', {
          ...state.input,
          status: 'pandding',
        })
        .then((res) => {
          dispatch({
            type: 'INPUT',
            payload: { text: '' },
          });
        });
    } else {
      notify('Please add item!');
    }
  };
  //completed items
  const handleCompleted = (id) => {
    try {
      axios
        .get(`http://localhost:4040/Api/v2/todo/${id}`)
        .then((res) => {
          console.log(res.data);
          axios
            .put(`http://localhost:4040/Api/v2/todo/${id}`, {
              ...res.data.todo,
              status: 'completed',
            })
            .then((res) => {
              console.log(res.data);
              dispatch({
                type: 'ALLLIST',
                payload: [...state.allList, res.data],
              });
              notify('Completed!', 'success');
            });
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  // cancle items
  const handleCancle = (id) => {
    try {
      axios
        .get(`http://localhost:4040/Api/v2/todo/${id}`)
        .then((res) => {
          axios
            .put(`http://localhost:4040/Api/v2/todo/${id}`, {
              ...res.data.todo,
              status: 'cancle',
            })
            .then((res) => {
              notify('Cencle!');
              dispatch({
                type: 'ALLLIST',
                payload: [...state.allList, res.data],
              });
            });
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  // pandding items
  const handlePandding = (id) => {
    try {
      axios
        .get(`http://localhost:4040/Api/v2/todo/${id}`)
        .then((res) => {
          axios
            .put(`http://localhost:4040/Api/v2/todo/${id}`, {
              ...res.data.todo,
              status: 'pandding',
            })
            .then((res) => {
              notify('Pandding!', 'warning');
              dispatch({
                type: 'ALLLIST',
                payload: [...state.allList, res.data],
              });
            });
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  // delete  items
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4040/Api/v2/todo/${id}`)
      .then((res) => {
        notify('deleted', 'success');
        dispatch({
          type: 'ALLLIST',
          payload: [
            ...state.allList.filter((item) => item._id !== id),
          ],
        });
      });
  };
  useEffect(() => {
    axios.get('http://localhost:4040/Api/v2/todo').then((res) => {
      dispatch({ type: 'ALLLIST', payload: [...res.data.todo] });
    });
  }, [state]);
  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <div className="card h-100">
              <div className="card-header p-0  border border-3 border-primary border-start-0 border-top-0 border-end-0 text-center">
                <h3 className="text-uppercase  bg-primary py-4 text-white  fw-bolder">
                  ToDo App with Reducer
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 m-auto">
                    <div className="card border border-2  border-primary my-2 rounded-0">
                      <div className="card-body p-1">
                        <div>
                          <form
                            className="d-flex "
                            onSubmit={handlesubmite}
                            action=""
                          >
                            <input
                              className="form-control border-0  rounded-0 w-full"
                              type="text"
                              name="text"
                              value={state.input.text}
                              onChange={handleChange}
                              placeholder="Add New item"
                            />

                            <button
                              type="submit"
                              className="btn rounded-0 btn-primary"
                            >
                              <i class="bx bx-plus-medical"></i>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  {state.allList.length > 0 && (
                    <div className="col-md-4 my-1">
                      <div className="card rounded-0 shadow-sm  ">
                        <div className="card-header rounded-0 p-0 bg-primary text-center text-uppercase text-white">
                          <h6 className="pt-1">Pandding</h6>
                        </div>
                        <div className="card-body">
                          <table className="table table-striped table-color">
                            <thead>
                              <tr className="bg-secondary  text-white text-center">
                                <th className="p-0">Id</th>
                                <th className="p-0">Items</th>
                                <th className="p-0">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {state.allList.map((item, index) => {
                                if (item.status === 'pandding') {
                                  return (
                                    <tr
                                      key={index}
                                      className="text-center"
                                    >
                                      <td>{index + 1}</td>
                                      <td>{item.text}</td>
                                      <td>
                                        <button
                                          onClick={() =>
                                            handleCompleted(item._id)
                                          }
                                          className="btn btn-outline-success btn-sm  rounded-0"
                                        >
                                          <i class="bx bx-check-circle"></i>
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleCancle(item._id)
                                          }
                                          className="btn btn-sm btn-outline-info rounded-0 -0 mx-1"
                                        >
                                          <i class="bx bx-x"></i>
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleDelete(item._id)
                                          }
                                          className="btn btn-sm btn-outline-danger rounded-0 "
                                        >
                                          <i class="bx bxs-trash-alt"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                } else {
                                  return null;
                                }
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  {state.allList.length > 0 && (
                    <div className="col-md-4 my-1">
                      <div className="card rounded-0 shadow-sm ">
                        <div className="card-header rounded-0 p-0 bg-primary text-center text-uppercase text-white">
                          <h6 className="pt-1">Completed</h6>
                        </div>
                        <div className="card-body">
                          <table className="table table-striped table-color">
                            <thead>
                              <tr className="bg-secondary  text-white text-center">
                                <th className="p-0">Id</th>
                                <th className="p-0">Items</th>
                                <th className="p-0">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {state.allList.map(
                                (item, index) =>
                                  item.status === 'completed' && (
                                    <tr
                                      key={index}
                                      className="text-center"
                                    >
                                      <td>{index + 1}</td>
                                      <td>{item.text}</td>
                                      <td>
                                        <button
                                          onClick={() =>
                                            handlePandding(item._id)
                                          }
                                          className="btn btn-outline-warning btn-sm  rounded-0"
                                        >
                                          <i class="bx bx-reset"></i>
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleCancle(item._id)
                                          }
                                          className="btn btn-sm btn-outline-info rounded-0 -0 mx-1"
                                        >
                                          <i class="bx bx-x"></i>
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleDelete(item._id)
                                          }
                                          className="btn btn-sm btn-outline-danger rounded-0 "
                                        >
                                          <i class="bx bxs-trash-alt"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  {state.allList.length > 0 && (
                    <div className="col-md-4 my-1">
                      <div className="card rounded-0 shadow-sm ">
                        <div className="card-header rounded-0 p-0 bg-primary text-center text-uppercase text-white">
                          <h6 className="pt-1">Cancle</h6>
                        </div>
                        <div className="card-body">
                          <table className="table table-striped ">
                            <thead>
                              <tr className="bg-secondary  text-white text-center">
                                <th className="p-0">Id</th>
                                <th className="p-0">Items</th>
                                <th className="p-0">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {state.allList.map(
                                (item, index) =>
                                  item.status === 'cancle' && (
                                    <tr
                                      key={index}
                                      className="text-center"
                                    >
                                      <td>{index + 1}</td>
                                      <td>{item.text}</td>
                                      <td>
                                        <button
                                          onClick={() =>
                                            handleCompleted(item._id)
                                          }
                                          className="btn btn-outline-success btn-sm  rounded-0"
                                        >
                                          <i class="bx bx-check-circle"></i>
                                        </button>
                                        <button
                                          onClick={() =>
                                            handlePandding(item._id)
                                          }
                                          className="btn btn-sm btn-outline-warning rounded-0  mx-1"
                                        >
                                          <i class="bx bx-reset"></i>
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleDelete(item._id)
                                          }
                                          className="btn btn-sm btn-outline-danger rounded-0 "
                                        >
                                          <i class="bx bxs-trash-alt"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
