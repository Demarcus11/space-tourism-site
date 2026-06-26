import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "~/components/ui/carousel"

import { useState, useEffect } from "react"

import data from "~/data.json"

export default function Crew() {
  const [selectedCrewMember, setSelectedCrewMember] = useState(
    data.crew[0].name
  )

  const [api, setApi] = useState<CarouselApi>()

  // get the selected destination's object so we can gain access to name, image, bio, etc
  const crewMember = data.crew.find((item) => item.name === selectedCrewMember)

  // update the selected crew member when the carousel is swiped
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const index = api.selectedScrollSnap()

      setSelectedCrewMember(data.crew[index].name)
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  // scroll the carousel when a tab is clicked
  useEffect(() => {
    if (!api) return

    const index = data.crew.findIndex(
      (item) => item.name === selectedCrewMember
    )

    api.scrollTo(index)
  }, [selectedCrewMember, api])

  return (
    <main className="content-grid content-grid--crew overflow-x-clip overflow-y-clip">
      <h1 className="mt-8 text-xl font-light tracking-widest uppercase sm:justify-self-start">
        <span className="font-semibold text-gray-600">02</span> Meet Your Crew
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
            {data.crew.map((item) => (
              <CarouselItem key={item.name}>
                <div className="image relative mt-10 h-120 after:absolute after:bottom-0 after:block after:h-0.5 after:w-full after:bg-gray-600 after:content-['']">
                  <img
                    className="mx-auto"
                    src={item?.images.png}
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
          defaultValue={selectedCrewMember}
          onValueChange={setSelectedCrewMember}
          value={selectedCrewMember}
          className="my-12 flex gap-12 data-[orientation=horizontal]:flex-col-reverse lg:my-0 lg:h-96 lg:max-w-[65ch] lg:text-left lg:data-[orientation=horizontal]:flex-col"
        >
          {data.crew.map((item) => (
            <TabsContent value={item.name} key={item.name}>
              <h2 className="mb-4 font-serif text-3xl text-white-200 uppercase lg:mb-8 lg:text-5xl lg:text-white">
                <span className="mb-2 block text-xl text-gray-500 lg:mb-4 lg:text-3xl">
                  {item.role}
                </span>
                {item.name}
              </h2>

              <p className="text-lg leading-10 text-white-200 lg:font-light">
                {item.bio}
              </p>
            </TabsContent>
          ))}

          {/* Dots */}
          <TabsList className="mx-auto gap-6 bg-transparent group-data-horizontal/tabs:h-fit lg:mx-[revert]">
            {data.crew.map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.name}
                className="aspect-square w-2 rounded-full bg-white/30 transition-colors hover:bg-white/60 data-[state=active]:bg-white"
              />
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="image relative mt-10 hidden h-160 w-140 max-lg:h-[revert] max-lg:w-[revert] max-lg:after:absolute max-lg:after:bottom-0 max-lg:after:block max-lg:after:h-0.5 max-lg:after:w-full max-lg:after:bg-gray-600 max-lg:after:content-[''] sm:block lg:my-0">
        <img
          className="mx-auto min-h-full max-w-full max-lg:max-w-[80%]"
          src={crewMember?.images.png}
          alt={crewMember?.name}
          draggable={false}
        />
      </div>
    </main>
  )
}
