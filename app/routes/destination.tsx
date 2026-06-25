import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "~/components/ui/carousel"
import { Separator } from "~/components/ui/separator"

import { useState, useEffect } from "react"

import data from "~/data.json"

export default function Destination() {
  const [selectedDestination, setSelectedDestination] = useState(
    data.destinations[0].name
  )
  const [api, setApi] = useState<CarouselApi>()

  // get the selected destination's object so we can gain access to name, image, description, etc
  const destination = data.destinations.find(
    (item) => item.name === selectedDestination
  )

  // update the selected destination when the carousel is swiped
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const index = api.selectedScrollSnap()

      setSelectedDestination(data.destinations[index].name)
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  // scroll the carousel when a tab is clicked
  useEffect(() => {
    if (!api) return

    const index = data.destinations.findIndex(
      (item) => item.name === selectedDestination
    )

    api.scrollTo(index)
  }, [selectedDestination, api])

  return (
    <main className="content-grid content-grid--destination">
      <h1 className="mb-12 text-xl font-light tracking-widest uppercase sm:justify-self-start">
        <span className="font-semibold text-gray-600">01</span> Pick Your
        Destination
      </h1>

      <div className="sm:hidden">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {data.destinations.map((item) => (
              <CarouselItem key={item.name}>
                <img
                  className="mx-auto mb-12 max-w-[60%] sm:max-w-[50%] lg:max-w-[80%]"
                  src={item?.images.png}
                  alt={item?.name}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <img
        className="mb-12 hidden max-w-[60%] sm:block sm:max-w-[50%] lg:max-w-[80%]"
        src={destination?.images.png}
        alt={destination?.name}
        draggable={false}
      />

      <Tabs
        className="tabs gap-8 text-white-300 lg:max-w-[60ch]"
        defaultValue={selectedDestination}
        value={selectedDestination}
        onValueChange={setSelectedDestination}
      >
        <TabsList
          className="mx-auto gap-4 lg:mx-[revert] lg:mb-4 lg:gap-8"
          variant="line"
        >
          {data.destinations.map((item) => (
            <TabsTrigger
              key={item.name}
              value={item.name}
              className="tracking-widest text-white-200 uppercase hover:text-white-200 hover:after:bg-white hover:after:opacity-100 data-active:text-white-200 data-active:after:bg-white data-active:hover:text-white-200"
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {data.destinations.map((item) => (
          <TabsContent
            key={item.name}
            value={item.name}
            className="min-h-100 lg:text-left"
          >
            <div>
              <h2 className="mb-2 font-serif text-7xl uppercase sm:mb-4 lg:text-8xl">
                {item.name}
              </h2>

              <p className="text-base text-balance text-white-200 lg:text-lg">
                {item.description}
              </p>
            </div>

            <Separator className="my-8 bg-white/20" />

            <div className="flex flex-col gap-8 sm:flex-row sm:justify-evenly lg:justify-start lg:gap-20">
              <div>
                <h3 className="mb-1 tracking-widest text-white-200 uppercase">
                  Avg. Distance
                </h3>
                <p className="font-serif text-3xl uppercase">{item.distance}</p>
              </div>
              <div>
                <h3 className="mb-1 tracking-widest text-white-200 uppercase">
                  Est. Travel Time
                </h3>
                <p className="font-serif text-3xl uppercase">{item.travel}</p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}
