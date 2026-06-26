import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "~/components/ui/carousel"

import { useState, useEffect } from "react"

import data from "~/data.json"

export default function Technology() {
  const [selectedTechnology, setSelectedTechnology] = useState(
    data.technology[0].name
  )

  const [api, setApi] = useState<CarouselApi>()

  // get the selected destination's object so we can gain access to name, image, bio, etc
  const technology = data.technology.find(
    (item) => item.name === selectedTechnology
  )

  // update the selected technology when the carousel is swiped
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const index = api.selectedScrollSnap()

      setSelectedTechnology(data.technology[index].name)
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  // scroll the carousel when a tab is clicked
  useEffect(() => {
    if (!api) return

    const index = data.technology.findIndex(
      (item) => item.name === selectedTechnology
    )

    api.scrollTo(index)
  }, [selectedTechnology, api])

  return (
    <main className="content-grid content-grid--technology">
      <h1 className="mt-8 pl-8 text-xl font-light tracking-widest uppercase sm:justify-self-start">
        <span className="font-semibold text-gray-600">03</span> Space Launch 101
      </h1>

      <div className="image sm:hidden">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {data.technology.map((item) => (
              <CarouselItem key={item.name}>
                <div className="image mt-10">
                  <img
                    className="mx-auto"
                    src={item?.images.landscape}
                    alt={item?.name}
                    key={item.name}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="tabs">
        <Tabs
          defaultValue={selectedTechnology}
          onValueChange={setSelectedTechnology}
          value={selectedTechnology}
          className="my-12 flex gap-12 px-8 data-[orientation=horizontal]:flex-col-reverse lg:my-0 lg:h-96 lg:max-w-[85ch] lg:text-left lg:data-[orientation=horizontal]:flex-row-reverse"
        >
          {data.technology.map((item) => (
            <TabsContent value={item.name} key={item.name}>
              <h2 className="mb-4 font-serif text-3xl text-white-200 uppercase lg:mb-4 lg:text-5xl lg:text-white">
                <span className="mb-2 block text-lg text-gray-500 lg:text-2xl">
                  The Terminology...
                </span>
                {item.name}
              </h2>

              <p className="text-lg leading-10 text-white-200 lg:font-light">
                {item.description}
              </p>
            </TabsContent>
          ))}

          {/* Numbers */}
          <TabsList className="mx-auto gap-6 bg-transparent group-data-horizontal/tabs:h-fit lg:mx-[revert] lg:flex-col">
            {data.technology.map((item, index) => (
              <TabsTrigger
                key={item.name}
                value={item.name}
                className="aspect-square w-12 rounded-full font-serif text-white outline outline-white/30 transition-colors hover:bg-white/60 data-[state=active]:bg-white lg:w-16 lg:text-xl"
              >
                {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="image mt-10 hidden w-full sm:block lg:mt-0">
        {/* Tablet Img */}
        <img
          className="hidden min-h-full w-full max-lg:block"
          src={technology?.images.landscape}
          alt={technology?.name}
          draggable={false}
        />
        {/* Desktop Img */}
        <img
          className="mx-auto hidden min-h-full w-full lg:block"
          src={technology?.images.portrait}
          alt={technology?.name}
          draggable={false}
        />
      </div>
    </main>
  )
}
