import React from "react";
import "./styles.css";

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    if (user.active) {
      return (
        <a
          href="#"
          className="list-group-item list-group-item-action active"
          onClick={this.props.onClick}
        >
          {user.id} {user.name}
        </a>
      );
    } else {
      return (
        <a
          href="#"
          className="list-group-item list-group-item-action"
          onClick={this.props.onClick}
        >
          {user.id} {user.name}
        </a>
      );
    }
  }
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false
    };
  }

  setCompleted(task) {
    if (!task.completed) {
      task.completed = true;
      fetch("https://jsonplaceholder.typicode.com/todos/completed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.props.task.id,
          completed: true
        })
      });

      this.setState({ isCompleted: true });
    }
  }

  render() {
    const task = this.props.task;
    if (task.completed) {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={task.id}
            defaultChecked={task.completed}
            disabled
          />
          <label className="form-check-label" htmlFor={task.id}>
            {task.id} - {task.title}
          </label>
        </div>
      );
    } else {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={task.id}
            defaultChecked={task.completed}
            onClick={() => this.setCompleted(task)}
          />
          <label className="form-check-label" htmlFor={task.id}>
            {task.id} - {task.title}
          </label>
        </div>
      );
    }
  }
}

class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tasks = this.props.tasks;
    if (tasks) {
      return (
        <form>
          {tasks.map((t) => (
            <Task key={t.id} task={t} />
          ))}
        </form>
      );
    } else {
      return <p>Loading tasks.... </p>;
    }
  }
}

export default class TaskTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      tasks: null,
      userSelected: null
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getTasks();
  }

  getUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (response) => {
          this.setState({ users: response });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getTasks() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then(
        (response) => {
          this.setState({ tasks: response });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  userClicked(u) {
    if (this.state.userSelected) {
      this.state.userSelected.active = false;
    }
    u.active = true;
    this.setState({ userSelected: u });
    //console.log("user " + u.id);
  }

  renderTasks(u) {
    const tasks = this.state.tasks;
    const userTasks = tasks.filter((task) => task.userId === u.id);
    return userTasks;
  }

  render() {
    const users = this.state.users;
    const userSelected = this.state.userSelected;
    if (userSelected) {
      const userTasks = this.renderTasks(userSelected);
      //console.log(userTasks);
      return (
        <div className="container mt-5">
          <h1 className="text-center">Onboarding Tracker</h1>
          <div className="row mt-5">
            <div className="col-6">
              <div className="list-group">
                {users.map((u) => (
                  <User
                    key={u.id}
                    user={u}
                    onClick={() => this.userClicked(u)}
                  />
                ))}
              </div>
            </div>
            <div className="col-6">
              <TaskList tasks={userTasks} />
            </div>
          </div>
        </div>
      );
    } else if (users) {
      return (
        <div className="container mt-5">
          <h1 className="text-center">Onboarding Tracker</h1>
          <div className="row mt-5">
            <div className="col-6">
              <div className="list-group">
                {users.map((u) => (
                  <User
                    key={u.id}
                    user={u}
                    onClick={() => this.userClicked(u)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mt-5">
          <h1 className="text-center">Onboarding Tracker</h1>
          <div className="row mt-2">
            <div className="col-6">
              <p>Loading....</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
