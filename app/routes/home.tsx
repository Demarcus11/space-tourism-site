export default function Home() {
  return (
    <main className="content-grid content-grid--home">
      <div className="max-w-[55ch] text-white-200">
        <h1 className="mt-12 text-lg font-light tracking-widest uppercase sm:mt-20 sm:text-xl lg:text-2xl">
          So, you want to travel to
          <span className="mt-4 mb-6 block font-serif text-8xl text-white sm:text-9xl">
            {" "}
            Space
          </span>
        </h1>

        <p className="max-lg:text-md text-lg">
          Let's face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kinf of on the edge of it. Well sit
          back, and relax because we'll give you a truly out of this world
          experience!
        </p>
      </div>

      <a
        className="relative grid aspect-square place-content-center overflow-x-hidden rounded-full bg-white p-12 font-serif text-2xl text-black uppercase after:absolute after:inset-0 after:-translate-x-full after:rounded-full after:bg-black/20 after:transition-transform after:duration-700 after:ease-in-out after:content-[''] hover:after:translate-x-0 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:after:translate-x-0"
        href="/destination"
      >
        Explore
      </a>
    </main>
  )
}
