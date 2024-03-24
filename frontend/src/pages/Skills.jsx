import SkillListItem from '../components/SkillListItem'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSkills } from '../features/skills/skillsSlice'
import FullPageSpinner from '../components/FullPageSpinner'

function Skills() {
    let { skillsList } = useSelector((state) => state.skills)
    let [isLoading, setIsLoading] = useState(true)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSkills())
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [dispatch])

    if (isLoading) return <FullPageSpinner />

    return (
        <div className='page skills'>
            <div className='header'>
                <h1>Skills</h1>
            </div>
            <div className='skillsDetailList wideList mt-5 mb-8'>
                {skillsList.map((item) => {
                    return <SkillListItem key={item._id} data={item} />
                })}
            </div>
        </div>
    )
}

export default Skills
