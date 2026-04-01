import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export function Buttons() {
  return (
    <div>
      <h2 className="mb-2">Buttons</h2>
      <ul className="flex *:mr-2">
        <li>
          <div className="mb-1">
            <Button>Primary</Button>
          </div>
          <div className="mb-1">
            <Button disabled>Primary</Button>
          </div>
          <div className="mb-1">
            <Button loading>Primary</Button>
          </div>
        </li>
        <li>
          <div className="mb-1">
            <Button color="secondary">Secondary</Button>
          </div>
          <div className="mb-1">
            <Button color="secondary" disabled>
              Secondary
            </Button>
          </div>
          <div className="mb-1">
            <Button color="secondary" loading>
              Secondary
            </Button>
          </div>
        </li>
        <li>
          <div className="mb-1">
            <Button color="accept">Accept</Button>
          </div>
          <div className="mb-1">
            <Button color="accept" disabled>
              Accept
            </Button>
          </div>
          <div className="mb-1">
            <Button color="accept" loading>
              Accept
            </Button>
          </div>
        </li>
        <li>
          <div className="mb-1">
            <Button color="ghost">Ghost</Button>
          </div>
          <div className="mb-1">
            <Button color="ghost" disabled>
              Ghost
            </Button>
          </div>
          <div className="mb-1">
            <Button color="ghost" loading>
              Ghost
            </Button>
          </div>
        </li>
      </ul>
      {/*  */}
      <h2 className="mb-2">Text + Icon</h2>
      <ul className="flex *:mr-2">
        <li>
          <div className="mb-1">
            <Button>
              <Icon name="action/copy" className="mr-1" />
              Copy
            </Button>
          </div>
          <div className="mb-1">
            <Button disabled>
              Copy
              <Icon name="action/copy" className="ml-1" />
            </Button>
          </div>
        </li>
        <li>
          <div className="mb-1">
            <Button color="secondary">
              <Icon name="action/copy" className="mr-1" />
              Copy
            </Button>
          </div>
          <div className="mb-1">
            <Button color="secondary" disabled>
              Copy
              <Icon name="action/copy" className="ml-1" />
            </Button>
          </div>
        </li>
        <li>
          <div className="mb-1">
            <Button color="accept">
              <Icon name="action/copy-check" className="mr-1" />
              Copy
            </Button>
          </div>
          <div className="mb-1">
            <Button color="accept" disabled>
              Copy
              <Icon name="profile/truck" className="ml-1 text-lg" />
            </Button>
          </div>
        </li>
        <li>
          <div className="mb-1">
            <Button color="ghost">
              <Icon name="action/copy-check" className="mr-1" />
              Copy
            </Button>
          </div>
          <div className="mb-1">
            <Button color="ghost" disabled>
              Copy
              <Icon name="profile/truck" className="ml-1 text-lg" />
            </Button>
          </div>
        </li>
      </ul>
    </div>
  )
}
