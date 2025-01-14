import { Button } from "../ui/Button";

export default function PageNotFound() {
  return (
    <div className="h-dvh bg-gray-300 pt-44">
      <div className="flex flex-col items-center space-y-14 text-center">
        <h1 className="text-3xl text-orange-500 sm:text-5xl">
          404 Page Not Found
        </h1>
        <p className="text-xl font-semibold">
          Sorry we can't find that page. You'll find lots to explore on the
          homepage
        </p>
        <div>
          <Button size="large" urlPath="/" color="brand">
            Back to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
