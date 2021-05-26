import { Dispatch, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "../../components/Button";
import { loginAction } from "../../redux/actions/auth";

import classes from "./Auth.module.css";
import { ToastContainer } from "../../components/Toast/ToastContainer";

interface IFormInputs {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { loading, error } = useSelector((state: any) => state.authReducer);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(loginAction(data, history));
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
          <span className={classes.formSpan}>Don't have account?</span>
          <Link className={classes.formLink} to="/register">
            Sign up
          </Link>
        </div>
        <Button loading={loading}>Sign in</Button>
      </form>
      {error && <ToastContainer toast={error} />}
    </>
  );
};
