import { useForm } from "react-hook-form";
import AuthField from "../../components/AuthField";
import Logo from "../../components/Logo";
import styles from "./styles.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import UserLoginInput from "../../@types/user-login-input";
import userSchema from "../../schemas/userLoginSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginClicked, setLoginClicked] = useState<boolean>(false);
  const [registerClicked, setRegisterClicked] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginInput>({
    resolver: zodResolver(userSchema),
  });

  async function createUser() {
    // ... Lógica de envio
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoginClicked(false);
    setRegisterClicked(false);

    reset();

    navigate("/home");
  }

  return (
    <>
      <div className={styles["login-info-container"]}>
        <Logo className={styles["site-logo"]} />

        <section className={styles["login-section"]}>
          <div className={styles["login-title"]}>
            <span>Bem vindo(a)!</span>
            <p>Entre na sua conta</p>
          </div>

          <form
            onSubmit={handleSubmit(createUser)}
            className={styles["auth-login-form"]}
          >
            <AuthField
              {...register("email")}
              className={styles["auth-login-field"]}
              fieldName="E-mail"
              fieldType="email"
              placeholder="Digite aqui seu e-mail"
            />

            {errors.email && <span>{"E-mail inválido"}</span>}

            <AuthField
              {...register("password")}
              className={styles["auth-login-field"]}
              fieldName="Senha"
              fieldType="password"
              placeholder="Digite aqui sua senha"
            />

            {errors.password && <span>{"Senha inválida"}</span>}

            <div className={styles["buttons-box"]}>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => setLoginClicked(true)}
              >
                {isSubmitting && loginClicked ? "Entrando..." : "Entrar"}
              </button>

              <button
                disabled={isSubmitting}
                onClick={() => setRegisterClicked(true)}
              >
                {isSubmitting && registerClicked
                  ? "Cadastrando..."
                  : "Cadastrar-se"}
              </button>

              {/* error handling: errors.root and setError ... */}
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
