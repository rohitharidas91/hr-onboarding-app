import { taskPhases } from "@/lib/data";
import { TaskPhase } from "./TaskPhase";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";

type TaskDtlsProps = {
  employeeId: string;
};

export function TaskDtls({ employeeId }: TaskDtlsProps) {
  return taskPhases.map((phase) => (
    <div key={phase.id}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={phase.name} className="">
          <AccordionTrigger className="border mx-2 my-0.5 px-3 bg-accent">
            {phase.name}
          </AccordionTrigger>
          <TaskPhase phaseId={phase.id} employeeId={employeeId} />
        </AccordionItem>
      </Accordion>
    </div>
  ));
}
