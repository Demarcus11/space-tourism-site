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
    <main className="content-grid content-grid--crew">
      <h1 className="mt-8 text-xl font-light tracking-widest uppercase sm:justify-self-start">
        <span className="font-semibold text-gray-600">02</span> Meet Your Crew
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
            {data.crew.map((item) => (
              <CarouselItem key={item.name}>
                <div className="image relative my-10 after:absolute after:bottom-0 after:block after:h-0.5 after:w-full after:bg-gray-500 after:content-['']">
                  <img
                    className="mx-auto max-w-[80%]"
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
          className="flex gap-8 data-[orientation=horizontal]:flex-col-reverse lg:data-[orientation=horizontal]:flex-col"
        >
          {data.crew.map((item) => (
            <TabsContent value={item.name} key={item.name}>
              <h2 className="mb-4 font-serif text-3xl text-white uppercase">
                <span className="mb-1 block text-xl text-gray-400">
                  {item.role}
                </span>
                {item.name}
              </h2>

              <p className="text-lg text-white-200">{item.bio}</p>
            </TabsContent>
          ))}

          <TabsList className="mx-auto gap-6 bg-transparent group-data-horizontal/tabs:h-fit lg:mx-[revert]">
            {data.crew.map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.name}
                className="aspect-square w-4 rounded-full bg-white/30 transition-colors hover:bg-white/60 data-[state=active]:bg-white"
              />
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="image relative my-10 hidden max-lg:after:absolute max-lg:after:bottom-0 max-lg:after:block max-lg:after:h-0.5 max-lg:after:w-full max-lg:after:bg-gray-500 max-lg:after:content-[''] sm:block lg:my-0">
        <img
          className="mx-auto min-h-full max-w-full"
          src={crewMember?.images.png}
          alt={crewMember?.name}
        />
      </div>
    </main>
  )
}
