import { Dispatch, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "../../components/Button";
import { registerAction } from "../../redux/actions/auth";

import classes from "./Auth.module.css";
import { ToastContainer } from "../../components/Toast/ToastContainer";

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

export const Register: FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { loading, error } = useSelector((state: any) => state.auth);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(registerAction(data, history));
  };

  return (
    <>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={classes.inputWrapper}>
          <input
            className={classes.input}
            type="text"
            placeholder="Name"
            {...register("name", {
              minLength: {
                value: 2,
                message: "Your name must be at least 2 characters",
              },
              required: {
                value: true,
                message: "You must enter your name",
              },
            })}
          />
          <span className={classes.error}>{errors.name?.message}</span>
        </div>
        <div className={classes.inputWrapper}>
          <input
            className={classes.input}
            type="text"
            placeholder="Email"
            {...register("email", {
              pattern: {
                value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email",
              },
              required: {
                value: true,
                message: "You must enter your email",
              },
            })}
          />
          <span className={classes.error}>{errors.email?.message}</span>
        </div>
        <div className={classes.inputWrapper}>
          <input
            className={classes.input}
            type="password"
            placeholder="Password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Your password must be at least 6 characters",
              },
              required: {
                value: true,
                message: "You must enter your password",
              },
            })}
          />
          <span className={classes.error}>{errors.password?.message}</span>
        </div>
        <div className={classes.formLinkWrapper}>
          <span className={classes.formSpan}>Already have account?</span>
          <Link className={classes.formLink} to="/login">
            Sign in
          </Link>
        </div>
        <Button loading={loading} disabled={loading}>
          Sign up
        </Button>
      </form>
      {error && <ToastContainer toast={error} />}
    </>
  );
};
