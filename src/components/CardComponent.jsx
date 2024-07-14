import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";

const CardComponent = ()=>{
    return(
        <>
            <Card className="py-4" isHoverable isPressable>   
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src="https://i.ibb.co/QFNp1Nq/Screenshot-2024-07-12-154449.png" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600"> Zoey Lang</h4>
                    <h5 className="text-small tracking-tight text-default-400"> @zoeylang</h5>
                    </div>
                </div>
                </CardHeader>
            
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://i.ibb.co/QFNp1Nq/Screenshot-2024-07-12-154449.png"
                    width={270}
                    />
                </CardBody>
            </Card>
        </>
    );
}

export default CardComponent;