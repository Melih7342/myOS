def recommend_distros(user_answers, all_distros):
    scored_results = []

    for distro in all_distros:
        score = 0
        # Scoring System:
        # Must-have --> 20 points
        # Very important --> 15 points
        # Important --> 10 points
        # Nice to have --> 5 points
        # 100 points are the maximum

        category = (distro.get('category') or "").lower()
        price = (distro.get('price') or "").lower()
        image_size_str = (distro.get('image_size') or "0")

        def get_first_val(key):
            val = user_answers.get(key, [])
            return val[0] if isinstance(val, list) and len(val) > 0 else val

        # 1. Use Case
        selected_use_case = user_answers.get('use_case', [])
        if len(selected_use_case) > 0:
            if selected_use_case[0].lower() in category:
                score += 20

        # 2. Experience
        exp = get_first_val('experience')
        if exp == 'Beginner' and distro.get('beginner_friendly'):
            score += 15
        elif exp == 'Intermediate' and distro.get('beginner_friendly'):
            score += 5

        # 3. Popularity
        pop_pref = get_first_val('popularity')
        try:
            pop_value = int(distro.get('popularity') or 999)
        except ValueError:
            pop_value = 999

        if pop_pref == "Absolutely" and pop_value <= 20:
            score += 15
        elif pop_pref == "Would be nice" and pop_value <= 20:
            score += 5

        # 4. Hardware
        if get_first_val('hardware') == 'Old' and 'old computers' in category:
            score += 15

        # 5. GUI
        if get_first_val('gui') == 'Yes' and 'desktop' in category:
            score += 15

        # 6. Light Weight
        if get_first_val('weight') == 'Yes' and get_avg_size(image_size_str) <= 1000:
            score += 10

        # 7. Live Medium
        if get_first_val('livetest') == 'Yes' and 'live medium' in category:
            score += 10

        # 8. Knockout: Price
        if get_first_val('price') == 'Yes' and 'free' not in price:
            score = 0

        if score > 0:
            scored_results.append({
                "name": distro.get("name"),
                "description": distro.get("description", "No description"),
                "match_score": score,
                "logo_name": distro.get("logo_name"),
                "match_percent": min(score, 100),
                "category": distro.get("category"),
                "price": distro.get("price")
            })

    scored_results.sort(key=lambda x: x['match_score'], reverse=True)

    return scored_results[:3]


def get_avg_size(size_string):
    try:
        parts = size_string.split('-')
        numbers = [int(s.strip().replace(',', '')) for s in parts if s.strip().isdigit()]

        if len(numbers) == 2:
            return sum(numbers) / 2
        elif len(numbers) == 1:
            return numbers[0]
        return 0
    except:
        return 0