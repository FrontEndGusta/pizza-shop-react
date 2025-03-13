import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.number(),
  email: z.string().email(),
});

type signUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {

    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signUpForm>();

  async function handleSignUp(data: signUpForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Restaurante cadastrado com sucesso!.", {
        action: {
          label: "Login",
          onClick: () => navigate('/sign-in'),
        },
      });
      console.log(data);
    } catch (error) {
      toast.error("Credenciais inválidas.");
    }
  }
  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              ></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              ></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")}></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register("phone")}></Input>
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>

            <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
              Ao continuar, você concorda com nossos <br />
              <a className="underline underline-offset-4">termos de serviço</a> e <a className="underline underline-offset-4">
                politícas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
