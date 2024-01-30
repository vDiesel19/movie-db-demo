import { ProductCard } from "../../../components/";
import { useFetch } from "../../../hooks/useFetch";

export const FeaturedProducts = ({ apiPath }) => {
  const { data: movies } = useFetch(apiPath);

  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured Movies</h1>    
      <div className="flex flex-wrap justify-center lg:flex-row">
      { movies.map((movie, index) => {
        if (index <= 2) {
          return (
            <ProductCard movie={ movie } key={ movie.id } />
          );
        }
      })}
      </div>
    </section>
  )
}
