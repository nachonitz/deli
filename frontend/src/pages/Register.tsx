import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { CreateUserDto } from "../api/models/user";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../components/shared/inputField";
import Page from "../components/shared/page";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import RegisterButton from "../components/pages/register/registerButton";

const Register = () => {
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { register: userRegister } = useContext(UserContext);
  const handleRegister = async (data: CreateUserDto) => {
    setCreatingUser(true);
    userRegister(data).catch((error) => {
      setCreatingUser(false);
      setError(error?.message?.toString());
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Formato de email incorrecto")
      .required("El email es requerido"),
    fullname: Yup.string().required("El nombre es requerido"),
    age: Yup.number()
      .typeError("La edad debe ser un número")
      .required("La edad es requerida"),
    username: Yup.string().required("El nombre de usuario es requerido"),
    country: Yup.string().required("El pais es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  return (
    <Page>
      <div className="flex items-center justify-center pt-10 pb-10">
        <div className="w-full sm:max-w-[500px] sm:p-14 sm:shadow-2xl">
          <form onSubmit={handleSubmit(handleRegister)}>
            <h1 className="text-3xl font-bold text-center mb-4 text-secondary">
              Registrarse
            </h1>
            <InputField
              label="Email"
              type="email"
              placeholder="Email"
              error={errors.email}
              register={register("email")}
            />
            <InputField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              error={errors.fullname}
              register={register("fullname")}
            />
            <InputField
              label="Edad"
              type="number"
              placeholder="Edad"
              error={errors.age}
              register={register("age")}
            />
            <InputField
              label="Nombre de usuario"
              type="text"
              placeholder="Nombre de usuario"
              error={errors.username}
              register={register("username")}
            />
            <InputField
              label="País"
              type="text"
              placeholder="País"
              error={errors.country}
              register={register("country")}
            />
            <InputField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              error={errors.password}
              register={register("password")}
            />

            <RegisterButton disabled={creatingUser} />

            {error && <span className="text-red-500">{error}</span>}
          </form>
        </div>
      </div>
    </Page>
  );
};

export default Register;
