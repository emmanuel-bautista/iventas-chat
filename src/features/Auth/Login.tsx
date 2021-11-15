import React, { useEffect } from "react";
import loginImage from "../../assets/login.svg";
import loginMobileImage from "../../assets/login-mobile.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, error, authenticated, authenticating } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated === true) {
      navigate("/", {
        replace: true,
      });
    }
  }, [authenticated, navigate]);

  const onSubmit: SubmitHandler<Auth> = async ({ email, password }) => {
    dispatch(
      login({
        email,
        password,
      })
    );
  };

  return (
    <>
      {authenticating ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="bg-secondary w-full h-36 md:w-3/5 md:h-screen flex items-center justify-center relative">
            <img
              src={loginMobileImage}
              alt=""
              width={150}
              height={133}
              className="absolute md:hidden"
              style={{
                bottom: "-3rem",
              }}
            />
            <img
              src={loginImage}
              alt=""
              width={450}
              height={490}
              className="hidden md:block"
            />
          </div>
          <div className="w-full flex items-center justify-center mt-10">
            <div className="w-full p-5 md:p-0 md:w-3/6">
              <h1 className="font-montserrat text-22 md:text-40 font-bold text-center mb-16">
                Iniciar sesión
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                  <label className="font-inter font-bold text-16 text-gray-200 mb-1">
                    Correo
                  </label>
                  <input
                    type="text"
                    className="bg-secondary rounded-full px-4 py-2"
                    placeholder="Ingresa tu correo"
                    {...register("email", {
                      validate: (value) => {
                        const r = /([a-z]+|[A-Z]+)@{1}([a-z]+|[A-Z]+)\.com/;
                        return r.test(value) || "Correo no válido";
                      },
                    })}
                  />
                  {errors.email && (
                    <small>
                      <strong className="text-red-500">
                        {errors.email?.message || "El campo es requerido"}
                      </strong>
                    </small>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor=""
                    className="font-inter font-bold text-16 text-gray-200 mb-1"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="bg-secondary rounded-full px-4 py-2"
                    placeholder="Ingresa tu contraseña"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  {errors.password && (
                    <small>
                      <strong className="text-red-500">
                        {errors.password?.message || "El campo es requerido"}
                      </strong>
                    </small>
                  )}
                </div>
                {error && (
                  <div>
                    <strong className="font-montserrat text-red-600">
                      <small>{error}</small>
                    </strong>
                  </div>
                )}
                <div className="w-full flex justify-center mt-16">
                  <button
                    type="submit"
                    className="bg-primary rounded-full text-white font-bold"
                    style={{ width: "250px", height: "50px" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex w-full justify-center items-center">
                        <div
                          className={`spinner border-white mr-2 ${
                            loading && "opacity-60"
                          }`}
                        ></div>
                        <p>Espere...</p>
                      </div>
                    ) : (
                      <span>Iniciar sesión</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
